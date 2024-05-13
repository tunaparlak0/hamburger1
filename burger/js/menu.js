 
let cartItems = []; 
let total = 0;

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

// Sepetten öğeyi kaldırma fonksiyonu
function removeFromCart(name) {
  const index = cartItems.findIndex(item => item.name === name);
  if (index !== -1) {
    total -= cartItems[index].price; // Kaldırılan ürünün fiyatını total fiyattan çıkar
    cartItems[index].quantity--; // Sadece bir tane öğe sil
    if (cartItems[index].quantity === 0) {
      cartItems.splice(index, 1); // Eğer öğe kalmadıysa tamamen kaldır
    }
    if (total < 0) { // Eğer total fiyat negatifse, 0'a eşitle
      total = 0;
    }
    updateCart();
  }
}

// Sepet listesini güncelleyen fonksiyon
function updateCart() {
  const cartElement = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");
  
  // Önceki sepeti temizle
  cartElement.innerHTML = "";
  
  // Her ürün için bir liste öğesi oluştur
  cartItems.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} x ${item.quantity}: $${item.price * item.quantity}`;
    
    // Her ürün için bir silme butonu oluştur
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Remove from Cart";
    deleteButton.classList.add("delete-btn");
    
    // Her butonun click olayını handle ederek, sepetten ürünü kaldır
    deleteButton.addEventListener("click", function() {
      removeFromCart(item.name);
    });
    
    // Liste öğesine silme butonunu ekle
    li.appendChild(deleteButton);
    
    // Liste öğesini sepete ekle
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

// Sayfanın altına gitmek için buton
document.getElementById("scrollToBottomBtn").addEventListener("click", function() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });
});