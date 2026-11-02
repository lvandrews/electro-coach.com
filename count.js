// Cookie-free visit counts for electro-coach.com (Lela, 2 Nov 2026), sent to Aptabase
// (aptabase.com) under the website's own app key, apart from the app's usage counts.
//
// Each page opened sends one count: which page (home, privacy or terms) and the website that
// sent the visitor (just its name, or "direct"), with the browser's language. Aptabase works
// out the country and the kind of device from the connection and doesn't store the address.
// No cookies, nothing stored in the browser, no ID. Nothing is sent when the browser asks
// sites not to track (Do Not Track or Global Privacy Control), or away from electro-coach.com.
(function () {
  try {
    var n = navigator;
    if (n.doNotTrack === '1' || window.doNotTrack === '1' || n.globalPrivacyControl === true) return;
    if (location.hostname !== 'electro-coach.com' || !window.fetch) return;
    var pages = { '/': 'home', '/index.html': 'home', '/privacy.html': 'privacy', '/terms.html': 'terms' };
    var page = pages[location.pathname] || 'other';
    var from = 'direct';
    if (document.referrer) {
      try {
        var h = new URL(document.referrer).hostname.replace(/^www\./, '');
        from = h === 'electro-coach.com' ? 'this site' : h.slice(0, 40);
      } catch (e) { from = 'unknown'; }
    }
    var key = 'A-US-1665481313';
    var session = String(Math.floor(Date.now() / 1000)) + String(Math.floor(Math.random() * 1e8)).padStart(8, '0');
    var ev = {
      timestamp: new Date().toISOString(), sessionId: session, eventName: 'page_view',
      systemProps: { locale: (n.language || '').slice(0, 20), isDebug: false, appVersion: 'website', sdkVersion: 'electro-coach-site@1' },
      props: { page: page, from: from }
    };
    fetch('https://us.aptabase.com/api/v0/event', {
      method: 'POST', credentials: 'omit', keepalive: true, referrerPolicy: 'no-referrer',
      headers: { 'Content-Type': 'application/json', 'App-Key': key },
      body: JSON.stringify(ev)
    }).catch(function () {});
  } catch (e) { /* counts are never worth an error */ }
})();
