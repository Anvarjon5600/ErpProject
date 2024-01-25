export default function ({ route, redirect, app }) {
  const lang = route.fullPath.split('/')[1]
  if (lang === 'en') {
    app.i18n.locale = lang
  } else {
    redirect('/' + app.i18n.locale + route.fullPath)
  }
}
