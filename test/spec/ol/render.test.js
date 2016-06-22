goog.provide('ol.test.render');

describe('ol.render', function() {

  describe('toContext', function() {

    it('creates an ol.render.canvas.Immediate and sets defaults', function() {
      var canvas = document.createElement('canvas');
      var render = ol.render.toContext(canvas.getContext('2d'));
      expect(render).to.be.a(ol.render.canvas.Immediate);
      expect(render.pixelRatio_).to.be(ol.has.DEVICE_PIXEL_RATIO);
    });

    it('sets size and pixel ratio from options', function() {
      var canvas = document.createElement('canvas');
      var pixelRatio = 1.5;
      var size = [100, 50];
      var render = ol.render.toContext(canvas.getContext('2d'),
          {pixelRatio: pixelRatio, size: size});
      expect(render.pixelRatio_).to.be(pixelRatio);
      expect(render.extent_).to.eql(
          [0, 0, size[0] * pixelRatio, size[1] * pixelRatio]);
      expect(canvas.style.width).to.be(size[0] + 'px');
      expect(canvas.style.height).to.be(size[1] + 'px');
      var transform = ol.matrix.makeTransform(ol.matrix.create(),
          0, 0, pixelRatio, pixelRatio, 0, 0, 0);
      expect(ol.matrix.equals(render.transform_, transform)).to.be.ok();
    });
  });

});


goog.require('ol.matrix');
goog.require('ol.render');
goog.require('ol.render.canvas.Immediate');
goog.require('ol.vec.Mat4');
