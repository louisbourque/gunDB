import Gun from 'gun/gun';

const gun = Gun(['https://gundb-louis.herokuapp.com/gun']);


const textInput = document.getElementById('myInput');

var ref = gun.get('text').not(function (key) {
  // put in an object and key it
  gun.put({
    text: ''
  }).key(key)
});
ref.on(function(data){
  textInput.value = data.text;
  document.body.style.backgroundColor = data.text;
});

window.updateMyInput = () => {
  ref.path('text').put(textInput.value);
}
