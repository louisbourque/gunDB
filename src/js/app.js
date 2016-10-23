import Gun from 'gun/gun';

//const gun = Gun(['http://localhost:8080/gun']);
//const gun = Gun(['http://localhost:8080/gun','https://gundb-louis.herokuapp.com/gun']);
const gun = Gun(['https://gundb-louis.herokuapp.com/gun']);

const hexColor = document.getElementById('hexColor');

var ref = gun.get('text').not(function (key) {
  // put in an object and key it
  gun.put({
    text: ''
  }).key(key)
});
ref.on(function(data){
  hexColor.value = data.text;
  document.body.style.backgroundColor = data.text;
});

window.updateHexColor = () => {
  ref.path('text').put(hexColor.value);
}
