// svg is converted and made into a blob
// a Blob object is then turned into a url
// finally the image file is downloaded
function print()
{
    domtoimage.toBlob(document.getElementById('wrapper')).then( blob =>{
        var blob = new Blob([blob], {type: "image/png"});
        var url  = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.download = "my-image.png";
        link.href = url;
        link.click();
    });
}