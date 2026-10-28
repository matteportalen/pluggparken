// worker.js - renderar ett band av rader av ett ark åt gången
importScripts('engine.js');
self.onmessage = function (e) {
  const m = e.data;
  const rgba = HornEngine.renderBand(m.scene, m.cfg, m.def, m.y0, m.y1);
  self.postMessage({ id: m.id, sheet: m.sheet, y0: m.y0, y1: m.y1, rgba: rgba }, [rgba.buffer]);
};
