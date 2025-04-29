<template>
    <footer class="flex flex-col justify-start p-6 py-[104px] bg-black w-full h-full">
      <!-- Container principal responsivo -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Coluna com logo e texto -->
        <div class="flex flex-col items-center md:items-start pr-0 md:pr-20">
          <img class="w-36 py-4" src="@/assets/cyber-logo-white.svg" alt="Logo" />
          <p class="text-white text-xl text-center md:text-left">
            We are a residential interior design firm located in Portland.
          </p>
          <p class="text-white text-xl text-center md:text-left !mb-2">Our boutique-studio offers more than</p>
  
          <div class="flex gap-4 mt-4 md:hidden">
            <img class="w-8 h-8" src="@/components/icons/social/Twitter.svg" alt="Twitter" />
            <img class="w-8 h-8" src="@/components/icons/social/Facebook.svg" alt="Facebook" />
            <img class="w-8 h-8" src="@/components/icons/social/Tiktok.svg" alt="Tiktok" />
            <img class="w-8 h-8" src="@/components/icons/social/Instagram.svg" alt="Instagram" />
          </div>
        </div>

        <div class="flex flex-col items-center md:items-start">
          <h3 class="text-white text-2xl">Services</h3>
          <ul class="space-y-2 text-gray-400 text-xl text-center md:text-left">
            <li><a>Bonus program</a></li>
            <li><a>Gift cards</a></li>
            <li><a>Credit and Payment</a></li>
            <li><a>Services Contracts</a></li>
            <li><a href="">Non-cash account</a></li>
            <li><a href="">Payment</a></li>
          </ul>
        </div>
  
        <div class="flex flex-col items-center md:items-start">
          <h3 class="text-white text-2xl">Assistance to the Buyer</h3>
          <ul class="space-y-2 text-gray-400 text-xl text-center md:text-left">
            <li><a>Find an order</a></li>
            <li><a>Terms of delivery</a></li>
            <li><a>Exchange and return of goods</a></li>
            <li><a>Guarantee</a></li>
            <li><a>Frequently asked questions</a></li>
            <li><a>Terms of use of the site</a></li>
          </ul>
        </div>
      </div>

      <div class="hidden md:flex flex-row gap-8 mt-8">
        <img class="w-8 h-8" src="@/components/icons/social/Twitter.svg" alt="iconTwitter" />
        <img class="w-8 h-8" src="@/components/icons/social/Facebook.svg" alt="iconFacebook" />
        <img class="w-8 h-8" src="@/components/icons/social/Tiktok.svg" alt="iconTiktok" />
        <img class="w-8 h-8" src="@/components/icons/social/Instagram.svg" alt="iconInstagram" />
      </div>
    </footer>
  </template>
  