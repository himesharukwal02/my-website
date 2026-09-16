const products = [
  {id:1,name:"Naurang Suit Set",category:"straight",price:2499,compare:2999,badge:"NEW",sizes:["S","M","L","XL","2XL"],stock:"in",sales:10,date:"2026-09-16",img:"assets/product-01.jpg",desc:"Elegant printed suit set with coordinated dupatta."},
  {id:2,name:"Lucky Floral Suit Set",category:"straight",price:2299,compare:2799,badge:"NEW",sizes:["S","M","L","XL","2XL"],stock:"in",sales:9,date:"2026-09-16",img:"assets/product-02.jpg",desc:"Floral digital-print suit set with soft dupatta."},
  {id:3,name:"Jyotika Suit Set",category:"straight",price:2699,compare:3199,badge:"PREMIUM",sizes:["S","M","L","XL","2XL"],stock:"in",sales:8,date:"2026-09-16",img:"assets/product-03.jpg",desc:"Elegant festive suit set with detailed floral work."},
  {id:4,name:"Indian Beauty Suit Set",category:"straight",price:2399,compare:2899,badge:"NEW",sizes:["S","M","L","XL","2XL"],stock:"in",sales:7,date:"2026-09-16",img:"assets/product-04.jpg",desc:"Printed ethnic suit set designed for festive wear."},
  {id:5,name:"Satrangi Bandhej Suit Set",category:"straight",price:2199,compare:2699,badge:"BESTSELLER",sizes:["S","M","L","XL","2XL"],stock:"in",sales:12,date:"2026-09-16",img:"assets/product-05.jpg",desc:"Bandhej-inspired suit set with statement detailing."},
  {id:6,name:"Kala Kruti Suit Set",category:"straight",price:2299,compare:2799,badge:"NEW",sizes:["S","M","L","XL","2XL"],stock:"in",sales:6,date:"2026-09-16",img:"assets/product-06.jpg",desc:"Printed suit set with a soft-flowing dupatta."},
  {id:7,name:"Anjali Gulbano Suit Set",category:"straight",price:2599,compare:3099,badge:"PREMIUM",sizes:["S","M","L","XL","2XL"],stock:"in",sales:11,date:"2026-09-16",img:"assets/product-07.jpg",desc:"Floral ethnic suit set with coordinated dupatta."},
  {id:8,name:"Diamond Suit Set",category:"straight",price:2499,compare:2999,badge:"BESTSELLER",sizes:["S","M","L","XL","2XL"],stock:"in",sales:13,date:"2026-09-16",img:"assets/product-08.jpg",desc:"Elegant printed suit set with decorative neckline work."},
  {id:9,name:"Afgatoon Suit Set",category:"straight",price:2399,compare:2899,badge:"NEW",sizes:["S","M","L","XL","2XL"],stock:"in",sales:8,date:"2026-09-16",img:"assets/product-09.jpg",desc:"Rayon suit set with zigzag print and matching dupatta."},
  {id:10,name:"Rangoli Suit Set",category:"straight",price:2499,compare:2999,badge:"PREMIUM",sizes:["S","M","L","XL","2XL"],stock:"in",sales:10,date:"2026-09-16",img:"assets/product-10.jpg",desc:"Festive suit set with elegant printed detailing."}
];
let category="all", search="", cart=JSON.parse(localStorage.getItem("kradha_cart")||"[]"), wishlist=JSON.parse(localStorage.getItem("kradha_wishlist")||"[]");

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const money=n=>"₹"+n.toLocaleString("en-IN");

function save(){localStorage.setItem("kradha_cart",JSON.stringify(cart));localStorage.setItem("kradha_wishlist",JSON.stringify(wishlist));updateCounts();}
function updateCounts(){$("#cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0);$("#wishCount").textContent=wishlist.length;}

function filtered(){
 let list=products.filter(p=>(category==="all"||p.category===category||category==="new")&&(!search||p.name.toLowerCase().includes(search.toLowerCase())));
 const av=$$(".availability").filter(x=>x.checked).map(x=>x.value);
 const sizes=$$(".sizeFilter").filter(x=>x.checked).map(x=>x.value);
 const min=Number($("#minPrice").value||0),max=Number($("#maxPrice").value||999999);
 if(av.length) list=list.filter(p=>av.includes(p.stock?"in":"out"));
 if(sizes.length) list=list.filter(p=>p.sizes.some(s=>sizes.includes(s)));
 list=list.filter(p=>p.price>=min&&p.price<=max);
 const sort=$("#sortSelect").value;
 if(sort==="az")list.sort((a,b)=>a.name.localeCompare(b.name));
 if(sort==="za")list.sort((a,b)=>b.name.localeCompare(a.name));
 if(sort==="low")list.sort((a,b)=>a.price-b.price);
 if(sort==="high")list.sort((a,b)=>b.price-a.price);
 if(sort==="best")list.sort((a,b)=>b.sales-a.sales);
 if(sort==="new")list.sort((a,b)=>b.date-a.date);
 return list;
}

function render(){
 const list=filtered(), grid=$("#productGrid");
 grid.innerHTML=list.map(p=>`
 <article class="product-card">
  <div class="product-image">
   <img src="${p.img}" alt="${p.name}" onerror="this.style.display='none'">
   ${p.badge?`<span class="badge">${p.badge}</span>`:""}
   <button class="heart ${wishlist.includes(p.id)?"active":""}" onclick="toggleWish(${p.id})">${wishlist.includes(p.id)?"♥":"♡"}</button>
   ${!p.stock?'<span class="sold">SOLD OUT</span>':""}
   ${p.stock?`<button class="quick-add" onclick="openProduct(${p.id})">VIEW & SELECT SIZE</button>`:""}
  </div>
  <div class="product-info">
   <h3>${p.name}</h3>
   <div class="price">${money(p.price)} <span class="compare">${money(p.compare)}</span></div>
   <div class="sizes">${p.sizes.join("  ·  ")}</div>
  </div>
 </article>`).join("");
 $("#productCountText").textContent=`${list.length} ${list.length===1?"product":"products"}`;
 $("#resultLabel").textContent=`${list.length} PRODUCTS`;
 $("#noResults").hidden=list.length!==0;
 updateCounts();
}

function setCategory(c){
 category=c; search="";
 $("#searchInput").value="";
 const names={all:"SHOP ETHNIC WEAR",anarkali:"ANARKALI SUITS",straight:"STRAIGHT SUITS",sharara:"SHARARA SUITS",saree:"SAREES",chikankari:"CHIKANKARI",palazzo:"PALAZZO SUITS",punjabi:"PUNJABI SUITS",frock:"FROCK SUITS",cape:"CAPE SUITS",new:"NEW ARRIVALS"};
 $("#collectionTitle").textContent=names[c]||"SHOP ETHNIC WEAR";
 $("#crumb").textContent=names[c]||"SHOP";
 document.querySelector("#collection").scrollIntoView({behavior:"smooth",block:"start"});
 $("#mainNav").classList.remove("open");
 render();
}

function toggleWish(id){
 if(wishlist.includes(id))wishlist=wishlist.filter(x=>x!==id);else wishlist.push(id);
 save();render();
}

function openDrawer(id){$("#drawerBackdrop").classList.add("open");$(id).classList.add("open");}
function closeDrawers(){$("#drawerBackdrop").classList.remove("open");$$(".drawer").forEach(x=>x.classList.remove("open"))}
function renderCart(){
 $("#cartItems").innerHTML=cart.length?cart.map(x=>{const p=products.find(y=>y.id===x.id);return `<div class="cart-row"><img src="${p.img}" alt=""><div><h4>${p.name}</h4><p>${money(p.price)}</p><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><span>${x.qty}</span><button onclick="changeQty(${p.id},1)">+</button></div><button class="remove" onclick="removeCart(${p.id})">Remove</button></div></div>`}).join(""):`<div class="empty-state"><h3>Your cart is empty</h3><p>Add something beautiful from the collection.</p></div>`;
 const total=cart.reduce((a,x)=>{const p=products.find(y=>y.id===x.id);return a+p.price*x.qty},0);
 $("#cartSubtotal").textContent=money(total);
}
function addCart(id,qty=1,size="M"){const found=cart.find(x=>x.id===id&&x.size===size);if(found)found.qty+=qty;else cart.push({id,qty,size});save();renderCart();closeModal("productModal");openDrawer("#cartDrawer");}
function changeQty(id,d){const x=cart.find(x=>x.id===id);if(x){x.qty+=d;if(x.qty<1)cart=cart.filter(y=>y!==x)}save();renderCart()}
function removeCart(id){cart=cart.filter(x=>x.id!==id);save();renderCart()}
function renderWishlist(){
 $("#wishlistItems").innerHTML=wishlist.length?wishlist.map(id=>{const p=products.find(x=>x.id===id);return `<div class="wish-row"><img src="${p.img}" alt=""><div><h4>${p.name}</h4><p>${money(p.price)}</p><button class="remove" onclick="openProduct(${p.id})">View product</button></div><button class="remove" onclick="toggleWish(${p.id})">×</button></div>`}).join(""):`<div class="empty-state"><h3>Your wishlist is empty</h3><p>Tap the heart on any product to save it.</p></div>`;
}
function openProduct(id){
 const p=products.find(x=>x.id===id);
 $("#productDetail").innerHTML=`<div class="product-detail"><img src="${p.img}" alt="${p.name}"><div><p class="eyebrow">${p.category.toUpperCase()}</p><h2>${p.name}</h2><div class="detail-price">${money(p.price)} <span class="compare">${money(p.compare)}</span></div><p class="detail-desc">${p.desc}</p><h4>SELECT SIZE</h4><div class="size-options">${p.sizes.map((s,i)=>`<button class="${i===0?"selected":""}" data-size="${s}">${s}</button>`).join("")}</div><button class="primary-btn full" id="detailAdd" ${!p.stock?"disabled":""}>${p.stock?"ADD TO CART":"SOLD OUT"}</button><p class="modal-note">Free delivery • Easy size exchange • Secure checkout</p></div></div>`;
 $$(".size-options button").forEach(b=>b.onclick=()=>{$$(".size-options button").forEach(x=>x.classList.remove("selected"));b.classList.add("selected")});
 if(p.stock)$("#detailAdd").onclick=()=>addCart(p.id,1,$(".size-options button.selected").dataset.size);
 $("#productModal").classList.add("open");
}
function closeModal(id){$("#"+id).classList.remove("open")}

$$("[data-category]").forEach(b=>b.addEventListener("click",()=>setCategory(b.dataset.category)));
$("#searchToggle").onclick=()=>{$("#searchBar").classList.toggle("show");$("#searchInput").focus()};
$("#searchInput").oninput=e=>{search=e.target.value;render()};
$("#sortSelect").onchange=render;
$$(".availability,.sizeFilter").forEach(x=>x.onchange=render);
$("#minPrice").oninput=render;$("#maxPrice").oninput=render;
$("#clearFilters").onclick=()=>{$$(".availability,.sizeFilter").forEach(x=>x.checked=false);$("#minPrice").value="";$("#maxPrice").value="";render()};
$("#resetSearch").onclick=()=>setCategory("all");
$("#cartBtn").onclick=()=>{renderCart();openDrawer("#cartDrawer")};
$("#wishlistBtn").onclick=()=>{renderWishlist();openDrawer("#wishlistDrawer")};
$$(".closeDrawer").forEach(b=>b.onclick=closeDrawers);
$("#drawerBackdrop").onclick=closeDrawers;
$("#mobileMenuBtn").onclick=()=>$("#mainNav").classList.toggle("open");
$("#filterMobileBtn").onclick=()=>document.body.classList.toggle("mobile-filter-open");
$("#mobileFilterToggle").onclick=()=>document.body.classList.toggle("mobile-filter-open");
$("#profileBtn").onclick=()=>$("#profileModal").classList.add("open");
$$(".modal-close").forEach(b=>b.onclick=()=>closeModal(b.dataset.close));
$$(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.classList.remove("open")}));
const SUPABASE_URL = "https://fskntitlolwuwrsoxkdg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_XN9KqFO-ZTwF11eg8siqkA_trzFtUNH";
const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY) : null;
let authMode = "signup";

function setAuthMode(mode){
  authMode=mode;
  $("#authTitle").textContent=mode==="signup"?"CREATE ACCOUNT":"LOGIN";
  $("#saveAccount").textContent=mode==="signup"?"CREATE ACCOUNT":"LOGIN";
  $("#authName").style.display=mode==="signup"?"block":"none";
  $("#authSwitch").innerHTML=mode==="signup"?"Already have an account? <button type=\"button\" id=\"showLogin\">LOGIN</button>":"New to KRADHA? <button type=\"button\" id=\"showSignup\">CREATE ACCOUNT</button>";
  $("#showLogin")?.addEventListener("click",()=>setAuthMode("login"));
  $("#showSignup")?.addEventListener("click",()=>setAuthMode("signup"));
  $("#authMessage").textContent="";
}
async function refreshAuthUI(){
  if(!supabaseClient)return;
  const {data:{session}}=await supabaseClient.auth.getSession();
  $("#logoutBtn").style.display=session?"block":"none";
  $("#saveAccount").style.display=session?"none":"block";
  $("#authName").style.display=session?"none":(authMode==="signup"?"block":"none");
  $("#authEmail").style.display=session?"none":"block";
  $("#authPassword").style.display=session?"none":"block";
  $("#forgotPassword").style.display=session?"none":(authMode==="login"?"block":"none");
  $("#authSwitch").style.display=session?"none":"block";
  $("#accountMessage").textContent=session?`Logged in as ${session.user.email}`:"";
}
$("#saveAccount").onclick=async()=>{
  if(!supabaseClient)return $("#authMessage").textContent="Supabase is not loaded. Refresh the page and try again.";
  const email=$("#authEmail").value.trim(), password=$("#authPassword").value, name=$("#authName").value.trim();
  if(!email||!password)return $("#authMessage").textContent="Enter your email and password.";
  if(password.length<6)return $("#authMessage").textContent="Password must be at least 6 characters.";
  $("#authMessage").textContent="Please wait...";
  if(authMode==="signup"){
    const {data,error}=await supabaseClient.auth.signUp({email,password,options:{data:{name}}});
    if(error)return $("#authMessage").textContent=error.message;
    localStorage.setItem("kradha_account",JSON.stringify({name,email}));
    $("#authMessage").textContent=data.session?"Account created and logged in.":"Account created. Check your email to confirm your account, then log in.";
  }else{
    const {data,error}=await supabaseClient.auth.signInWithPassword({email,password});
    if(error)return $("#authMessage").textContent=error.message;
    localStorage.setItem("kradha_account",JSON.stringify({name:data.user.user_metadata?.name||"",email:data.user.email||email}));
    $("#authMessage").textContent="Login successful.";
  }
  await refreshAuthUI();
};
$("#logoutBtn").onclick=async()=>{if(supabaseClient)await supabaseClient.auth.signOut();$("#authMessage").textContent="Logged out.";setAuthMode("login");await refreshAuthUI();};
$("#forgotPassword").onclick=async()=>{
  if(!supabaseClient)return;
  const email=$("#authEmail").value.trim();
  if(!email)return $("#authMessage").textContent="Enter your email first.";
  const {error}=await supabaseClient.auth.resetPasswordForEmail(email,{redirectTo:location.origin+location.pathname});
  $("#authMessage").textContent=error?error.message:"Password reset email sent. Check your inbox.";
};
if(supabaseClient){
  supabaseClient.auth.onAuthStateChange((_event)=>refreshAuthUI());
}
setAuthMode("signup");
refreshAuthUI();
$("#checkoutBtn").onclick=()=>{if(!cart.length)return alert("Your cart is empty.");closeDrawers();$("#checkoutModal").classList.add("open")};
const OWNER_WHATSAPP="918053941443"; // Replace with KRADHA owner's WhatsApp number, e.g. 919876543210
$("#placeOrder").onclick=()=>{
 const n=$("#custName").value.trim(),ph=$("#custPhone").value.trim(),ad=$("#custAddress").value.trim();
 if(!n||!ph||!ad)return alert("Please fill your name, mobile number and address.");
 if(!cart.length)return alert("Your cart is empty.");
 const order="KR"+Date.now().toString().slice(-8);
 const total=cart.reduce((a,x)=>{const p=products.find(y=>y.id===x.id);return a+p.price*x.qty},0);
 const lines=cart.map(x=>{const p=products.find(y=>y.id===x.id);return `${p.name} | Size: ${x.size} | Qty: ${x.qty} | ${money(p.price*x.qty)}`});
 const payment=document.querySelector('input[name="payment"]:checked').value==="cod"?"Cash on Delivery":"Online Payment";
 const message=`KRADHA NEW ORDER%0AOrder ID: ${order}%0A%0ACustomer: ${encodeURIComponent(n)}%0AMobile: ${encodeURIComponent(ph)}%0AAddress: ${encodeURIComponent(ad)}%0APayment: ${encodeURIComponent(payment)}%0A%0AItems:%0A${lines.map(encodeURIComponent).join("%0A")}%0A%0ATotal: ${encodeURIComponent(money(total))}`;
 if(OWNER_WHATSAPP==="91XXXXXXXXXX"){
   alert(`Order ${order} is ready. The KRADHA owner WhatsApp number is configured.`);
   return;
 }
 const orderItems=cart.map(x=>{const p=products.find(y=>y.id===x.id);return {name:p.name,size:x.size,qty:x.qty,lineTotal:p.price*x.qty};});
 const orders=JSON.parse(localStorage.getItem("kradha_orders")||"[]");
 orders.push({order,name:n,phone:ph,address:ad,payment,items:orderItems,total,date:new Date().toLocaleString("en-IN"),status:"New"});
 localStorage.setItem("kradha_orders",JSON.stringify(orders));
 localStorage.setItem("kradha_last_order",JSON.stringify({order,n,ph,ad,payment,items:cart,total}));
 window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${message}`,"_blank");
 alert(`Order ${order} created. WhatsApp order details opened for the owner.`);
 cart=[];save();renderCart();closeModal("checkoutModal");
};
$("#contactBtn").onclick=()=>alert("KRADHA Customer Care\\nWhatsApp/Phone: Add your business number here\\nEmail: Add your business email here");
$("#trackBtn").onclick=()=>alert("Track Your Order\\nYour order tracking page can be connected after the shipping/backend setup.");
$("#policyBtn").onclick=()=>alert("KRADHA policies\\nFree delivery • Easy size exchange • Please add your final return policy before launch.");

const acc=JSON.parse(localStorage.getItem("kradha_account")||"null");
if(acc){$("#authName").value=acc.name||"";$("#authEmail").value=acc.email||""}
render();renderCart();renderWishlist();updateCounts();
