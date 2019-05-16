// Json stringify function is used to convert an array of rectangle objects
// and an array of plans objects into string
// a Blob object is made and then turned into a url
// finally the text file is downloaded
function saveData()
{
    var jsonData = JSON.stringify({boxes, plans});
    var blob = new Blob([jsonData], {type: "application/json"});
    var url  = URL.createObjectURL(blob);
    console.log("showing variable json data: "+jsonData);
    document.getElementById("save").setAttribute('href',url);
    document.getElementById("save").setAttribute('textContent',"Download backup.json");
}
