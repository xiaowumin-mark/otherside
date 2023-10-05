package main

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"math/rand"
	"net/http"
	"os"
	"path"
	"strconv"
	"time"

	"path/filepath"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type UploadForm struct {
	File http.File `form:"file"`
}

type File struct { //小镇网盘json结构体
	Id   string `json:"id"`
	Name string `json:"name"`
	Size string `json:"size"`
	Time string `json:"time"`
	Dir  string `json:"dir"`
}
type town_diak_users struct {
	gorm.Model
	Uname  string
	Upwd   string
	Uemail string
	Utype  string
	Ustate bool
	Umsg   string
}

type disk_xcx struct {
	gorm.Model
	Path      string
	Name      string
	Icon      string
	Introduce string
	Star      int64
	Type      bool
	Bfsdstar  bool
}

type town_disk_yz struct {
	gorm.Model
	Main string
	Num  int
}

type town_disk_msg struct {
	gorm.Model
	Email  string
	Text   string
	Choose bool
}

type town_disk_tj struct {
	gorm.Model
	Tj_type string
	Num     int
}

type Data struct {
	DbUser string `json:"db_user"`
	DbPwd  string `json:"db_pwd"`
	DbPort string `json:"db_port"`
	DbData string `json:"db_database"`
}

type Conf struct {
	TownFile    string `json:"townfile"`
	Ym          string `json:"domainname"`
	Data        Data   `json:"db"`
	Port        string `json:"port"`
	DiskXcxIcon string `json:"diskxcxicon"`
}
type Up_img struct {
	Errno int `json:"errno"`
	Data  struct {
		URL  string `json:"url"`
		Alt  string `json:"alt"`
		Href string `json:"href"`
	} `json:"data"`
}

var Config Conf

func main() {

	fmt.Println(`
	██████╗ ███████╗███████╗██████╗ 
	██╔══██╗██╔════╝██╔════╝██╔══██╗
	██████╔╝█████╗  ███████╗██║  ██║
	██╔══██╗██╔══╝  ╚════██║██║  ██║
	██████╔╝██║     ███████║██████╔╝
	╚═════╝ ╚═╝     ╚══════╝╚═════╝ 
		`)

	file, _ := os.Open("./conf.json")
	// 关闭文件
	defer file.Close()
	// NewDecoder创建一个从file读取并解码json对象的*Decoder，解码器有自己的缓冲，并可能超前读取部分json数据。
	decoder := json.NewDecoder(file)
	//Decode从输入流读取下一个json编码值并保存在v指向的值里
	err := decoder.Decode(&Config)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("[BFSD]网站域名：" + Config.Ym + "\n[BFSD]网站启动端口：" + Config.Port + "\n[BFSD]mysql用户名：" + Config.Data.DbUser + "\n[BFSD]mysql密码：" + Config.Data.DbPwd + "\n[BFSD]mysql端口号：" + Config.Data.DbPort + "\n[BFSD]连接数据库的名称：" + Config.Data.DbData)

	// 连接数据库
	dsn := Config.Data.DbUser + ":" + Config.Data.DbPwd + "@tcp(127.0.0.1:" + Config.Data.DbPort + ")/" + Config.Data.DbData + "?charset=utf8mb4&parseTime=True&loc=Local"
	fmt.Println("[BFSD] " + dsn)
	//ds := "root:123456@tcp(127.0.0.1:3306)/otherside_go?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		fmt.Println("[BFSD]数据库连接失败")
		fmt.Println(err)
	}

	fmt.Println("[BFSD]数据库连接成功！！！")

	db.AutoMigrate(&town_diak_users{}, &town_disk_yz{}, &town_disk_msg{}, &town_disk_tj{}, &disk_xcx{})

	// 读取conf.json文件
	//conf, err := os.Open("conf.json")
	// 如果文件打开失败，需要进行err的错误处理
	//if err != nil {
	//	fmt.Println(err)
	//}
	//fmt.Println("读取conf文件 ")
	// 最后要关闭文件
	//defer conf.Close()

	// 判断数据库是否为空 town_disk_ty 数据库是否为空
	// 如果为空则创建数据
	// 如果不为空 则返回
	// 检查数据库内是否有对应的数据 没有则创建数据
	var ifd town_disk_tj
	if err = db.Where("tj_type = ?", "download_ppt").First(&ifd).Error; err != nil {
		fmt.Println("[BFSD]town_disk_tj 数据库中没有数据！！")
		fmt.Println("[BFSD]正在创建数据..")
		cjsj := []town_disk_tj{
			{Tj_type: "download_ppt", Num: 0},
			{Tj_type: "visit_num", Num: 0},
		}
		db.Create(&cjsj)

	}

	gin.SetMode(gin.ReleaseMode)
	gin.DefaultWriter = ioutil.Discard
	r := gin.Default()

	//partner_town := r.Group("api/v1")
	r.LoadHTMLGlob("templates/**/*")            //加载html文件
	r.StaticFS("/static", http.Dir("./static")) //加载网页所需的静态资源

	r.GET("town/disk", func(c *gin.Context) { // 小镇网盘首页
		c.HTML(http.StatusOK, "town/index.tmpl", gin.H{
			"add":     "http://" + Config.Ym + "/static/town",
			"adderss": "http://" + Config.Ym + "/town/disk",
			"ym_add":  "http://" + Config.Ym + "/",
		})
		// 添加 town_disk_tj 表中的统计数据
		var cxnum town_disk_tj
		var zjnum town_disk_tj
		db.Where("tj_type = ?", "visit_num").First(&cxnum)
		db.Model(zjnum).Where("tj_type = ?", "visit_num").Update("num", cxnum.Num+1)

		timeStr := time.Now().Format("2006-01-02 15:04:05")
		fmt.Println("[BFSD] " + timeStr + " " + c.ClientIP() + " 访问 " + c.FullPath())
	})
	r.GET("town/disk/sj", func(c *gin.Context) {

		c.HTML(http.StatusOK, "town/indexsj.tmpl", gin.H{
			"add":     "http://" + Config.Ym + "/static/town",
			"adderss": "http://" + Config.Ym + "/town/disk",
			"ym_add":  "http://" + Config.Ym + "/",
		})

		var cxnum town_disk_tj
		var zjnum town_disk_tj
		db.Where("tj_type = ?", "visit_num").First(&cxnum)
		db.Model(zjnum).Where("tj_type = ?", "visit_num").Update("num", cxnum.Num+1)
		timeStr := time.Now().Format("2006-01-02 15:04:05")
		fmt.Println("[BFSD] " + timeStr + " " + c.ClientIP() + " 访问 " + c.FullPath())
	})

	//小镇网盘api
	// ----------------------------------------------------------
	r.GET("api/town/disk/all", func(c *gin.Context) { //文件目录api
		//查看文件目录
		var add string = c.DefaultQuery("add", "/")
		x := TownFile(Config.TownFile, add)

		c.JSON(200, gin.H{
			"path": x,
		})

	})

	r.GET("api/town/disk/mkdir", func(c *gin.Context) { //创建文件夹api
		var add string = c.DefaultQuery("add", "")
		var name string = c.DefaultQuery("name", "none")

		os.Mkdir(Config.TownFile+add+"/"+name, os.ModePerm)

		c.JSON(200, gin.H{
			"code": 200,
			"path": Config.TownFile + add + "/" + name,
			"Msg":  "mkdir ok",
		})
	})

	r.GET("api/town/disk/token", func(c *gin.Context) { // 获取小镇网盘下载通行证api
		length := 16
		baseStr := "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
		//baseSymbol := "!@#$%^*()[]{}+-*/_."
		token := "BFTD" + getRandStr(baseStr, length)

		u1 := town_disk_yz{Main: token, Num: 5}
		db.Create(&u1)
		c.JSON(200, gin.H{
			"code":  200,
			"token": token,
			"sun":   5,
		})
	})

	r.GET("api/town/disk/agatoken", func(c *gin.Context) { // 减小下载文件通行证api
		tokenz := c.DefaultQuery("token", "none")

		if tokenz == "none" {
			c.JSON(200, gin.H{
				"code": 200,
				"Msg":  "No incoming temporary pass!",
			})
		} else {
			var town_disk_yzs town_disk_yz
			db.Debug().Where("main = ?", tokenz).First(&town_disk_yzs)

			l := town_disk_yzs

			if l.Num == 0 {
				id := l.ID
				db.Where("id = ?", id).Delete(&town_disk_yzs)
				c.JSON(200, gin.H{
					"code": 200,
					"Msg":  "tokenrunout",
				})
			} else {

				db.Model(&town_disk_yzs).Where("main = ?", tokenz).Update("num", l.Num-1)
				var cxnum town_disk_tj
				var zjnum town_disk_tj
				db.Where("tj_type = ?", "download_ppt").First(&cxnum)
				db.Model(zjnum).Where("tj_type = ?", "download_ppt").Update("num", cxnum.Num+1)

				c.JSON(200, gin.H{
					"code": 200,
					"Num":  l.Num,
					"Msg":  "ok",
				})
			}

		}

	})

	r.GET("api/town/disk/getppter", func(c *gin.Context) { // 小镇网盘注册ppter api
		name := c.DefaultQuery("name", "none")
		pwd := c.DefaultQuery("pwd", "none")
		email := c.DefaultQuery("email", "none")
		msg := c.DefaultQuery("msg", "none")
		utype := "ppter"
		zt := false

		if name == "none" || pwd == "none" || email == "none" {
			c.JSON(200, gin.H{
				"code": 200,

				"Msg": "Null value",
			})
		} else {
			ppteru := town_diak_users{Uname: name, Upwd: pwd, Uemail: email, Utype: utype, Ustate: zt, Umsg: msg}
			db.Create(&ppteru)
			c.JSON(200, gin.H{
				"code": 200,

				"Msg": "ok",
			})
		}
	})

	r.GET("api/town/disk/passppter", func(c *gin.Context) { // 小镇网盘获取ppter列表 或 通过api
		id := c.DefaultQuery("id", "none")
		if id == "none" {
			var ppterr []town_diak_users
			db.Debug().Where("utype = ? and ustate = ?", "ppter", false).Find(&ppterr)
			c.JSON(200, gin.H{
				"code":  200,
				"ppter": ppterr,
			})
		} else if id == "all" {
			var Allppterr []town_diak_users
			db.Where("utype = ? and ustate = ?", "ppter", true).Find(&Allppterr)
			c.JSON(200, gin.H{
				"code":  200,
				"ppter": Allppterr,
			})
		} else {
			var ppterr town_diak_users
			if err = db.Model(&ppterr).Where("id = ?", id).Update("ustate", true).Error; err != nil {
				c.JSON(200, gin.H{
					"code": 200,
					"Msg":  "error",
				})
			} else {
				c.JSON(200, gin.H{
					"code": 200,
					"Msg":  "ok",
				})
			}
		}

	})

	r.GET("api/town/disk/deleteppter", func(c *gin.Context) { // 小镇网盘删除ppter api
		id := c.DefaultQuery("id", "none")
		if id == "none" {
			c.JSON(200, gin.H{
				"code": 200,
				"Err":  "Value is null!",
			})
		} else {
			var ppterr town_diak_users
			if err = db.Where("id = ?", id).Delete(&ppterr).Error; err != nil {
				c.JSON(200, gin.H{
					"code": 200,
					"Msg":  "error",
				})
			} else {
				c.JSON(200, gin.H{
					"code": 200,
					"Msg":  "ok",
				})
			}

		}

	})

	r.GET("api/town/disk/loginppter", func(c *gin.Context) {
		name := c.DefaultQuery("name", "none")
		pwd := c.DefaultQuery("pwd", "none")
		email := c.DefaultQuery("email", "none")

		var ppterr town_diak_users
		if err = db.Where("uname = ? and uemail = ? and upwd = ?", name, email, pwd).First(&ppterr).Error; err != nil {
			c.JSON(200, gin.H{
				"code": 200,
				"Msg":  "账号或密码错误",
				"Err":  "false",
			})
		} else {
			if ppterr.Ustate == false {
				c.JSON(200, gin.H{
					"code": 200,
					"Msg":  "此账号未转正",
					"Err":  "false",
				})
			} else {
				c.JSON(200, gin.H{
					"code": 200,

					"Err": "true",
				})
			}

		}
	})

	r.POST("api/town/disk/file", func(c *gin.Context) {
		file, err := c.FormFile("file")
		if err != nil {
			c.String(500, "上传图片出错")
		}
		add := c.PostForm("add")

		// 上传文件到指定的目录，在项目根路径下创建/media/upload文件夹
		dst := path.Join("./static/town"+add, file.Filename)

		c.SaveUploadedFile(file, dst)

		c.JSON(200, gin.H{
			"code":     200,
			"Msg":      "true",
			"filename": file.Filename,
		})
	})

	r.GET("api/town/disk/loginadmin", func(c *gin.Context) {
		name := c.DefaultQuery("name", "none")
		pwd := c.DefaultQuery("pwd", "none")
		var adminU town_diak_users
		if err = db.Where("uname = ? and upwd = ? and utype = ?", name, pwd, "admin").First(&adminU).Error; err != nil {
			c.JSON(200, gin.H{
				"code": 200,
				"Msg":  "账号或密码错误",
				"Err":  "false",
			})
		} else {

			c.JSON(200, gin.H{
				"code": 200,

				"Err": "true",
			})

		}
	})
	r.GET("town/disk/admin", func(c *gin.Context) {
		c.HTML(http.StatusOK, "town/loginadmin.tmpl", gin.H{
			"add":     "http://" + Config.Ym + "/static/town",
			"adderss": "http://" + Config.Ym + "/town/disk/admin",
			"ym_add":  "http://" + Config.Ym + "/",
		})
		timeStr := time.Now().Format("2006-01-02 15:04:05")
		fmt.Println("[BFSD] " + timeStr + " " + c.ClientIP() + " 访问 " + c.FullPath())
	})

	r.GET("town/disk/admin/:name/:pwd", func(c *gin.Context) {
		name := c.Param("name")
		pwd := c.Param("pwd")
		var adminU town_diak_users
		if err = db.Where("uname = ? and upwd = ? and utype = ?", name, pwd, "admin").First(&adminU).Error; err != nil {
			c.JSON(200, gin.H{
				"code": 200,
				"Msg":  "账号或密码错误",
				"Err":  "false",
			})
		} else {
			var ppt town_disk_tj
			var fw town_disk_tj
			db.Where("tj_type = ?", "download_ppt").First(&ppt)
			db.Where("tj_type = ?", "visit_num").First(&fw)
			c.HTML(http.StatusOK, "town/admin.tmpl", gin.H{
				"add":     "http://" + Config.Ym + "/static/town",
				"adderss": "http://" + Config.Ym + "/town/disk/admin",
				"fw":      fw.Num,
				"ppt":     ppt.Num,
				"ym_add":  "http://" + Config.Ym + "/",
			})

		}
		timeStr := time.Now().Format("2006-01-02 15:04:05")
		fmt.Println("[BFSD] " + timeStr + " " + c.ClientIP() + " 访问 " + c.FullPath())
	})
	r.GET("api/town/disk/deletefile", func(c *gin.Context) {
		var add string = c.DefaultQuery("add", "")
		var name string = c.DefaultQuery("name", "none")

		err := os.RemoveAll(Config.TownFile + add + "/" + name)

		if err != nil {
			// 删除失败
			c.JSON(200, gin.H{
				"code": 200,
				"Err":  "error",
			})
		} else {
			// 删除成功
			c.JSON(200, gin.H{
				"code": 200,
				"Msg":  "ok",
			})
		}

	})

	r.GET("api/bfsd/loginadmin/", func(c *gin.Context) {
		name := c.DefaultQuery("name", "none")
		pwd := c.DefaultQuery("pwd", "none")
		var adminU town_diak_users
		if err = db.Where("uname = ? and upwd = ? and utype = ?", name, pwd, "admin").First(&adminU).Error; err != nil {
			c.JSON(200, gin.H{
				"code": 200,
				"Msg":  "账号或密码错误",
				"Err":  "false",
			})
		} else {

			c.JSON(200, gin.H{
				"code": 200,

				"Err": "true",
			})

		}
		timeStr := time.Now().Format("2006-01-02 15:04:05")
		fmt.Println("[BFSD] " + timeStr + " " + c.ClientIP() + " 访问 " + c.FullPath())
	})
	r.GET("bfsd/admin/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "bfsd/loginadmin.tmpl", gin.H{
			"add":     "http://" + Config.Ym + "/static/town",
			"adderss": "http://" + Config.Ym + "/bfsd/admin",
			"ym_add":  "http://" + Config.Ym + "/",
		})
		timeStr := time.Now().Format("2006-01-02 15:04:05")
		fmt.Println("[BFSD] " + timeStr + " " + c.ClientIP() + " 访问 " + c.FullPath())
	})
	r.GET("bfsd/admin/:name/:pwd", func(c *gin.Context) {
		name := c.Param("name")
		pwd := c.Param("pwd")
		var adminU town_diak_users
		if err = db.Where("uname = ? and upwd = ? and utype = ?", name, pwd, "admin").First(&adminU).Error; err != nil {
			c.JSON(200, gin.H{
				"code": 200,
				"Msg":  "账号或密码错误",
				"Err":  "false",
			})
		} else {

			c.HTML(http.StatusOK, "bfsd/admin.tmpl", gin.H{
				"add":     "http://" + Config.Ym + "/static/town",
				"adderss": "http://" + Config.Ym + "/bfsd/admin",

				"ym_add": "http://" + Config.Ym + "/",
			})

		}
		timeStr := time.Now().Format("2006-01-02 15:04:05")
		fmt.Println("[BFSD] " + timeStr + " " + c.ClientIP() + " 访问 " + c.FullPath())
	})

	r.POST("api/bfsd/disk/xcx_list", func(c *gin.Context) {
		var disk_xcx_list []disk_xcx
		db.Find(&disk_xcx_list)
		c.JSON(200, gin.H{
			"code": 200,
			"list": disk_xcx_list,
		})
	})

	r.POST("api/bfsd/disk/xcx_d_list", func(c *gin.Context) {
		id := c.PostForm("Id")
		var disk_xcx_d_list disk_xcx
		db.Where("id = ?", id).Delete(&disk_xcx_d_list)

		c.JSON(200, gin.H{
			"code": 200,
			"Msg":  "OK",
		})
	})
	r.POST("api/bfsd/disk/xcx_search_list", func(c *gin.Context) {
		sj := c.DefaultPostForm("name", "none")
		var xcx_search_list []disk_xcx
		db.Where("Introduce like ?", "%"+sj+"%").Find(&xcx_search_list)
		db.Where("Name like ?", "%"+sj+"%").Find(&xcx_search_list)

		c.JSON(200, gin.H{
			"code": 200,
			"Msg":  sj,
			"list": xcx_search_list,
		})
	})
	r.POST("api/bfsd/disk/xcx_add_list", func(c *gin.Context) {
		//if form, err := c.MultipartForm(); err == nil {

		id := c.DefaultPostForm("id", "none")
		name := c.PostForm("name")
		ppath := c.PostForm("path")
		intro := c.PostForm("introduce")
		ttype, terr := strconv.ParseBool(c.PostForm("type"))
		bfsdstar, berr := strconv.ParseBool(c.PostForm("bfsdstar"))
		if id != "none" {

			var disk_xcx_d_list disk_xcx
			db.Where("id = ?", id).First(&disk_xcx_d_list)
			db.Model(&disk_xcx_d_list).Where("id = ?", id).Update("Star", disk_xcx_d_list.Star+1)
			c.JSON(200, gin.H{
				"code": 200,
				"Msg":  "OK",
			})

		} else {
			if terr != nil || berr != nil {
				c.JSON(200, gin.H{
					"code": 200,
					"Msg":  "OK",
					"Err":  "解析值出错",
				})
			}
			file, err := c.FormFile("file")
			if err != nil {
				c.JSON(200, gin.H{
					"code": 200,
					"Msg":  "OK",
					"Err":  "图片上传错误！",
				})
			}
			//for _, file := range files {
			//	// 3.根据时间鹾生成文件名
			//	fileNameInt := time.Now().Unix()
			//	fileNameStr := strconv.FormatInt(fileNameInt, 10)
			//	//4.新的文件名(如果是同时上传多张图片的时候就会同名，因此这里使用时间鹾加文件名方式)
			//	fileName := fileNameStr + file.Filename
			//	//5.保存上传文件
			//	filePath := path.Join("./static/home/img/disk_xcx_icon",fileName)
			//	c.SaveUploadedFile(file, filePath)
			//
			//}
			extstring := path.Ext(file.Filename)

			//根据当前时间鹾生成一个新的文件名
			fileNameInt := time.Now().Unix()
			fileNameStr := strconv.FormatInt(fileNameInt, 10)
			//新的文件名
			fileName := fileNameStr + extstring
			//保存上传文件
			filePath := path.Join("./static/home/img/disk_xcx_icon", fileName)
			c.SaveUploadedFile(file, filePath)
			// 上传文件到指定的目录，在项目根路径下创建/media/upload文件夹

			l := Config.Ym + "/static/home/img/disk_xcx_icon/" + fileName
			xcx := disk_xcx{
				Path:      ppath,
				Name:      name,
				Icon:      l,
				Introduce: intro,
				Star:      0,
				Type:      ttype,
				Bfsdstar:  bfsdstar,
			}
			db.Create(&xcx)
			c.JSON(200, gin.H{
				"code": 200,
				"Msg":  "OK",
			})
			//}
		}

	})

	r.POST("api/bfsd/disk/upimg", func(c *gin.Context) {

		form := &UploadForm{}
		if err := c.ShouldBind(&form); err != nil {
			c.String(http.StatusBadRequest, "Failed to parse form data.")
			return
		}

		// 获取文件名
		fileName := form.File.Name()

		// 创建目标文件路径
		dstPath := filepath.Join("uploads", fileName)

		// 打开目标文件，如果文件不存在则创建新文件
		dstFile, err := os.Create(dstPath)
		if err != nil {
			c.String(http.StatusInternalServerError, "Failed to create destination file.")
			return
		}
		defer dstFile.Close()

		// 将上传的文件内容复制到目标文件
		_, err = io.Copy(dstFile, form.File)
		if err != nil {
			c.String(http.StatusInternalServerError, "Failed to copy file.")
			return
		}

		// 返回成功响应
		c.String(http.StatusOK, fmt.Sprintf("File '%s' uploaded successfully.", fileName))

	})
	r.NoRoute(func(c *gin.Context) {
		// 实现内部重定向
		c.HTML(http.StatusOK, "error/404.tmpl", gin.H{
			"title": "404",
		})
	})

	//彼方深都 软件

	r.Run(":" + Config.Port) // 监听并在 0.0.0.0:8080 上启动服务
}

func getRandStr(baseStr string, length int) string {
	r := rand.New(rand.NewSource(time.Now().UnixNano() + rand.Int63()))
	bytes := make([]byte, length, length)
	l := len(baseStr)
	for i := 0; i < length; i++ {
		bytes[i] = baseStr[r.Intn(l)]
	}
	return string(bytes)
}

func TownFile(url string, dir string) []File {
	filename := url + dir
	fileInfo, err := ioutil.ReadDir(filename)
	if err != nil {

	}

	//a := "{"
	//b := "}"
	var sz []File

	for i := 0; i < len(fileInfo); i++ {
		t := fileInfo[i].ModTime()
		str := t.Format("Jan 2, 2006 at 3:04pm (MST)")
		sjj := "{\"id\":\"" + strconv.Itoa(i+1) + "\",\"name\":\"" + fileInfo[i].Name() + "\",\"size\":\"" + formatFileSize(fileInfo[i].Size()) + "\",\"time\":\"" + str + "\",\"dir\":\"" + strconv.FormatBool(fileInfo[i].IsDir()) + "\"}"
		//fmt.Println(fileInfo[i].IsDir())

		var data File
		if err := json.Unmarshal([]byte(sjj), &data); err == nil {

			sz = append(sz, data)
		} else {

		}

	}

	return sz
}

func formatFileSize(fileSize int64) (size string) {
	if fileSize < 1024 {
		//return strconv.FormatInt(fileSize, 10) + "B"
		return fmt.Sprintf("%.2fB", float64(fileSize)/float64(1))
	} else if fileSize < (1024 * 1024) {
		return fmt.Sprintf("%.2fKB", float64(fileSize)/float64(1024))
	} else if fileSize < (1024 * 1024 * 1024) {
		return fmt.Sprintf("%.2fMB", float64(fileSize)/float64(1024*1024))
	} else if fileSize < (1024 * 1024 * 1024 * 1024) {
		return fmt.Sprintf("%.2fGB", float64(fileSize)/float64(1024*1024*1024))
	} else if fileSize < (1024 * 1024 * 1024 * 1024 * 1024) {
		return fmt.Sprintf("%.2fTB", float64(fileSize)/float64(1024*1024*1024*1024))
	} else { //if fileSize < (1024 * 1024 * 1024 * 1024 * 1024 * 1024)
		return fmt.Sprintf("%.2fPB", float64(fileSize)/float64(1024*1024*1024*1024*1024))
	}
}
