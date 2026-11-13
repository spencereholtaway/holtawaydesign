// The "Site" links in the footers (SiteFooter on the homepage and blog,
// AppFooter on the app pages). The app links are APP_PAGES in apps.ts.

/** On the homepage the section links scroll; elsewhere they go to the homepage. */
export function siteLinks(onHome: boolean) {
  const home = onHome ? '' : '/';
  return [
    { href: onHome ? '#top' : '/', label: 'Home' },
    { href: `${home}#recent`, label: 'Work' },
    { href: `${home}#career`, label: 'Career' },
    { href: `${home}#me`, label: 'Me' },
    { href: '/blog', label: 'Blog' },
    { href: '/blog/rss.xml', label: 'RSS feed' },
  ];
}
