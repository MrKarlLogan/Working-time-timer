const path = require('path'); //для того чтобы превратить относительный путь в абсолютный, мы будем использовать пакет path
module.exports = {
	mode: 'development',
	devtool: 'eval-source-map',
	devServer: {
		static: [
			{
				directory: path.resolve(__dirname, '..', 'public'), // путь, куда "смотрит" режим разработчика
				publicPath: '/',
			},
		],
		port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
		open: true, // сайт будет открываться сам при запуске npm run dev
		hot: true,
	},
};
