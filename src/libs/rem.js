(function(doc, win) {
    var docEl = doc.documentElement, maxFontSize = 32,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            var fontSize = 20 * (clientWidth / 320) > maxFontSize? maxFontSize : 20 * (clientWidth / 320);
            docEl.style.fontSize = fontSize + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);