const { createEditor, createToolbar } = window.wangEditor

const editorConfig = { MENU_CONF: {} }
editorConfig.placeholder = '从这里开始...'

editorConfig.onChange = (editor) => {
	const html = editor.getHtml()
	console.log('editor content', html)
	// 也可以同步到 <textarea>
	document.getElementById("html").innerHTML = html
}
editorConfig.MENU_CONF['uploadImage'] = {
	// 上传图片的配置
	server: 'http://localhost/api/bfsd/disk/upimg',
	fieldName: 'your-custom-name',

	// 单个文件的最大体积限制，默认为 2M
	maxFileSize: 1 * 1024 * 1024, // 1M

	// 最多可上传几个文件，默认为 100
	maxNumberOfFiles: 10,

	// 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
	allowedFileTypes: ['image/*'],

	// 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
	
	// 将 meta 拼接到 url 参数中，默认 false
	metaWithUrl: false,

	// 自定义增加 http  header
	

	// 跨域是否传递 cookie ，默认为 false
	withCredentials: true,

	// 超时时间，默认为 10 秒
	timeout: 5 * 1000, // 5 秒
}

const editor = createEditor({
	selector: '#editor-container',
	html: '<p><br></p>',
	config: editorConfig,
	mode: 'default', // or 'simple'
})

const toolbarConfig = {}



const toolbar = createToolbar({
	editor,
	selector: '#toolbar-container',
	config: toolbarConfig,
	mode: 'simple', // or 'simple'
})