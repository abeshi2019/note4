var msg;
var input;

function initial() {
    msg = document.getElementById('msg');
    input = document.getElementById('input');
    msg.textContent = '※本体価格を入力:';
}

function doclick(e) {
    var price = input.value * 1;
    var price2 = price * 1.08;
    msg.textContent = price + '円の税込価格:' + price2 + '円';
}