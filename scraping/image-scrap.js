var Xray = require('x-ray');
var fs = require('fs');
var Download = require('download');
var xray = new Xray();

xray('https://en.wikipedia.org/wiki/Pluto', 'img',
    [{
        img: '',
        src: '@src',
        width: '@width',
        height: '@height'
    }]
)
(function(err, results) {
    var download = new Download();
    results = results.filter(function(image) {
        return image.width > 100;
    }).forEach(function(image) {
        download.get(image.src);
    });
    download.dest('./images');
    download.run();
    fs.writeFile("./results.json", JSON.stringify(results, null, '\t'));
})