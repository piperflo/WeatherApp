

fetch("data/cats.json")
.then(resp => resp.json())
.then(callback)



function callback(data){
  data.cats.forEach(console.log(cat.name))
}