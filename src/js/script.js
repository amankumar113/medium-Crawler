
// // const Post = require('../../backend/models/blog')
const form = document.getElementById("search");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);
let page = 0

//function is used to form table on html page or frontend
function formTableStructure(data, div) {
    
    var html = '<table class="table table-hover table-striped table-bordered" id="posts">'
    html += '<tr>'
    //looping to calculate how many keys are there. To define on html page
    for(var key in data[0]){
        html += '<th>'+key+'</th>'
    }

    html += '</tr>'
    
    for(let i = 0; i < data.length; i++){
        html += '<tr>';
        value = data[i]
        for(var key in value){
            datapoint = value[key]
            if(key === 'Medium URL')
                datapoint = "<a href='" + datapoint + "'target = '_blank'>" + value['Creator'] + '</a>'
            html += '<td>'+datapoint+'</td>';
       }
       html += '<tr>';
    }

    html += '</table>'
    div.innerHTML = html
}

async function performRequest(tags, page, flag) {
    params = {tags: tags, page: page}

    url = document.URL + 'search?'
    
    var searchParams = new URLSearchParams()
    
    Object.keys(params).forEach(key => searchParams.append(key, params[key]))
    url = url + searchParams.toString()
    //fetching url of the page
    let response = await fetch(url);

    if (response.ok) {
        //getting json of crawl data from medium.com
        let json = await response.json();
        //sending data to backend
        // for(let i=0; i<json.length;i++){
        //     Post = new Post({
        //      creator: json[i]['Creator'],
        //      title: json[i]['title'],
        //      link: json[i]['link'],
        //      tags: json[i]['tags'],
        //      details: json[i]['details'],
        //     });
        //     Post.save();
        // }
        
        result_box = document.getElementById('result')
        //if crawling is happening on first time that at that time flag is equal to 0 
        //else simple append that data to existing table
        if(flag == 0)
            formTableStructure(json, result_box)
        else
            appendTable(json)
        document.getElementById('result').scrollIntoView(false)
    } else {
        let json = await response.json()
        alert("Error: " + json.error);
    }
}


//append data on table
function appendTable(data) {
    for(let i = 0; i < data.length; i++){
        var newRow = posts.insertRow()
        value = data[i]
        for(var key in value){
            datapoint = value[key]

            var newCell = newRow.insertCell()
            datapointElement = document.createTextNode(datapoint)
            //checking to get url of medium web page
            if(key === 'Medium URL') {
                var linkElement = document.createElement('a');
                var linkText = document.createTextNode("Post by: " + value['Creator']);
                linkElement.appendChild(linkText);
                linkElement.title = datapoint;
                linkElement.href = datapoint;
                datapointElement = linkElement
            }
            
            newCell.appendChild(datapointElement)
       }
    }
}

document.getElementById("find").addEventListener("click", function(){
    tags = document.getElementById('tags').value
    page = 0
    performRequest(tags, page, 0)
    document.getElementById('crawl').style.display = ''
})

document.getElementById("crawl").addEventListener("click", async function(){
    tags = document.getElementById('tags').value
    page++
    
    performRequest(tags, page, 1)
})

