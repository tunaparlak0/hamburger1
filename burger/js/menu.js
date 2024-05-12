 
let cartItems = []; 
let total = 0;

// Sepete öğe ekleme fonksiyonu
function addToCart(name, price) {
  const existingItem = cartItems.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    // Yeni bir öğe olarak sepete ekle
    cartItems.push({ name: name, price: price, quantity: 1 });
  }
  // Toplam tutarı güncelle
  total += price;
  updateCart();
}
// Sepet listesini güncelleyen fonksiyon
function updateCart() {
  const cartElement = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");
  // Önceki sepeti temizle
  cartElement.innerHTML = "";
  cartItems.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} x ${item.quantity}: $${item.price * item.quantity}`;
    cartElement.appendChild(li);
  });
  // Toplam tutarı güncelle
  totalElement.textContent = `Total: $${total.toFixed(2)}`;
}
// Sayfa yüklendiğinde çağrılacak fonksiyon
window.onload = function() {
  const addToCartButtons = document.querySelectorAll('.box-bottom .btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      const parentBox = event.target.closest('.box');
      const itemName = parentBox.dataset.name;
      const itemPrice = parseFloat(parentBox.dataset.price);
      addToCart(itemName, itemPrice);
    });
  });
};
//Sayfanın aşşağısına atmak için buton
document.getElementById("scrollToBottomBtn").addEventListener("click", function() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });
});
