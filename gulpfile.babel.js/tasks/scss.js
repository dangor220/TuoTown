import autoprefixer from "gulp-autoprefixer";
import csso from "gulp-csso"; // minification
import shorthand from "gulp-shorthand"; // use short property
import groupCssMediaQueries from "gulp-group-css-media-queries";
import sassPlugin from "gulp-sass";
import sassCompile from "sass";
import sassGlob from "gulp-sass-glob";
import webpCSS from "gulp-webp-css"; // add webp in html

const sass = sassPlugin(sassCompile);

// Обработка SCSS
export const scss = () => {
	return app.gulp.src(app.path.src.scss, { sourcemaps: app.plugins.isDev})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SCSS",
          message: "Error: <%= error.message %>",
        })
      )
    )
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(app.plugins.replace(/@img\//g, '../assets/img/'))
		.pipe(webpCSS())
		.pipe(autoprefixer())
		.pipe(shorthand())
		.pipe(groupCssMediaQueries())
		.pipe(app.gulp.dest(app.path.build.css, { sourcemaps: app.plugins.isDev }))
		.pipe(app.plugins.rename({ suffix: ".min" }))
		.pipe(csso())
		.pipe(app.gulp.dest(app.path.build.css, { sourcemaps: app.plugins.isDev }))
		.pipe(app.plugins.browsersync.stream());
};

