export const MainPaymentPlansInfo = [
     {
          id:"plan-001",
          title: "Free Package",
          price: "Free",
          location: "https://res.cloudinary.com/dyjahjf1p/image/upload/v1707382694/clickrwanda/pay-plans/newAds_projma.png",
          allowed: [
          { name: "Listed in New Ads", allowed: true },
          { name: "Ads allowed: 10ads", allowed: true },
          { name: "Limited Ad Views", allowed: true },
          { name: "Adress & Contact Visibility", allowed: true },
          { name: "Promotion For selected Ads", allowed: false },
          { name: "Personal Support Manager", allowed: false },
          { name: "Email & Social Media promotion", allowed: false },
          { name: "Social Media/Website Link inclusion", allowed: false },
          { name: "Youtube Video Promotion", allowed: false },
          ],
     },
     {
          id:"plan-002",
          title: "Basic Package",
          price: "Rwf 17,500 /Month",
          mainPrice: 17500,
          location: "https://res.cloudinary.com/dyjahjf1p/image/upload/v1707382694/clickrwanda/pay-plans/featuredAds_jrlvik.png",
          allowed: [
          { name: "Listed in Featured Ads", allowed: true },
          { name: "Ads allowed: 100ads", allowed: true },
          { name: "Promotion Power: 2x Ad Views", allowed: true },
          { name: "Adress & Contact Visibility", allowed: true },
          { name: "Ads Promoted: 15ads", allowed: true },
          { name: "Personal Support Manager", allowed: true },
          { name: "Email & Social Media promotion", allowed: false },
          { name: "Social Media/Website Link inclusion", allowed: false },
          { name: "Youtube Video Promotion", allowed: false },
          ],
          action: "/payment-plans/basic-plan",
          memberShipDuration: [
               {months: 1, price: 17500},
               {months: 3, price: 0},
               {months: 6, price: 0},
               {months: 12, price: 0}
          ]
     },
     {
          id:"plan-004",
          title: "Premium Package",
          price: "Rwf 45,000 /Month",
          mainPrice: 45000,
          location: "https://res.cloudinary.com/dyjahjf1p/image/upload/v1707382694/clickrwanda/pay-plans/featuredAds_jrlvik.png",
          allowed: [
          { name: "Listed in Featured Ads", allowed: true },
          { name: "Ads allowed: Unlimited", allowed: true },
          { name: "Promotion Power: 10x Ad Views", allowed: true },
          { name: "Adress & Contact Visibility", allowed: true },
          { name: "Ads Promoted: 30ads", allowed: true },
          { name: "Personal Support Manager", allowed: true },
          { name: "Email & Social Media promotion", allowed: true },
          { name: "Youtube Video Promotion", allowed: false },
          { name: "Social Media/Website Link inclusion", allowed: false },
          ],
          action: "/payment-plans/premium-plan", 
          memberShipDuration: [
               {months:6, price: 0},
               {months:12, price: 0}
          ]
     },
     {
          id:"plan-009",
          title: "Enterprise Package",
          price: "Rwf 50,000 /Month",
          mainPrice: 45000,
          location: "https://res.cloudinary.com/dyjahjf1p/image/upload/v1707382694/clickrwanda/pay-plans/featuredAds_jrlvik.png",
          allowed: [
          { name: "Listed in Featured Ads", allowed: true },
          { name: "Ads allowed: Unlimited", allowed: true },
          { name: "Promotion Power: 10x Ad Views", allowed: true },
          { name: "Adress & Contact Visibility", allowed: true },
          { name: "Ads Promoted: 30ads", allowed: true },
          { name: "Personal Support Manager", allowed: true },
          { name: "Email & Social Media promotion", allowed: true },
          { name: "Youtube Video Promotion", allowed: true },
          { name: "Social Media/Website Link inclusion", allowed: true},
          ],
          action: "/payment-plans/premium-plan", 
          memberShipDuration: [
               {months:6, price: 0},
               {months:12, price: 0}
          ]
     },
     {
          id:"plan-005",
          title: "Sponsored Package",
          price: "Rwf 50,000 /Month",
          mainPrice: 50000,
          location: "https://res.cloudinary.com/dyjahjf1p/image/upload/v1707382693/clickrwanda/pay-plans/sponsoredAds_mrsaub.png",
          allowed: [
          { name: "Position on the bottom of the website", allowed: true },
          { name: "Ads allowed: 100ads", allowed: true },
          { name: "Promotion Power: 15x Ad Views", allowed: true },
          { name: "Adress & Contact Visibility", allowed: true },
          { name: "Ads Promoted: 1ad", allowed: true },
          { name: "Personal Support Manager", allowed: true },
          { name: "Email & Social Media promotion", allowed: true },
          { name: "Social Media/Website Link inclusion", allowed: true },
          { name: "Youtube Video Promotion", allowed: true },
          ],
          action: "/payment-plans/sponsored-plan", 
          memberShipDuration: [
               {months:6, price: 0},
               {months:12, price: 0}
          ]
     },
     
];

export const ExtraBoostPlans = [
     {
          id:"plan-003",
          title: "Urgent Package",
          price: "Rwf 10,000 /Month",
          mainPrice:10000,
          location: "https://res.cloudinary.com/dyjahjf1p/image/upload/v1707382694/clickrwanda/pay-plans/featuredAds_jrlvik.png",
          allowed: [
          { name: "Listed in Featured Ads", allowed: true },
          { name: "Ads allowed: 100ads", allowed: true },
          { name: "Promotion Power: 10x Ad Views", allowed: true },
          { name: "Adress & Contact Visibility", allowed: true },
          { name: "Ads Promoted: 1ad", allowed: true },
          { name: "Personal Support Manager", allowed: true },
          { name: "Email & Social Media promotion", allowed: true },
          { name: "Youtube Video Promotion", allowed: true },
          { name: "Social Media/Website Link inclusion", allowed: false },
          ],
          action: "/payment-plans/urgent-plan", // Add action for navigation
     },
     {
          id:"plan-006",
          title: "Top Deals",
          price: "Rwf 15,000 /Month",
          mainPrice: 15000,
          location: "https://res.cloudinary.com/dyjahjf1p/image/upload/v1707382694/clickrwanda/pay-plans/topDeals_sycws7.png",
          allowed: [
          { name: "Listed in Top Deals", allowed: true },
          { name: "Positon on top of the website", allowed: true },
          { name: "Promotion Power: 15x Ad Views", allowed: true },
          { name: "Adress & Contact Visibility", allowed: true },
          { name: "Ads Promoted: 1ad", allowed: true },
          { name: "Personal Support Manager", allowed: true },
          { name: "Email & Social Media promotion", allowed: true },
          { name: "Youtube Video Promotion", allowed: true },
          { name: "Social Media/Website Link inclusion", allowed: false },
          ],
          action: "/payment-plans/top-deals-plan", 
          memberShipDuration: [
               {months: 1, price: 17500},
               {months: 3, price: 0},
               {months: 6, price: 0},
               {months: 12, price: 0}
          ]
     },
     {
          id:"plan-007",
          title: "Top Sellers",
          price: "Rwf 50,000 /Month",
          mainPrice: 50000,
          location: "https://res.cloudinary.com/dyjahjf1p/image/upload/v1707382693/clickrwanda/pay-plans/bestSellers_ecljmh.png",
          allowed: [
          { name: "Listed in “Our Top Sellers”", allowed: true },
          { name: "Positon on top of the website", allowed: true },
          { name: "Promotion Power: 15x Ad Views", allowed: true },
          { name: "Adress & Contact Visibility", allowed: true },
          { name: "Ads Promoted: All Ads", allowed: true },
          { name: "Personal Support Manager", allowed: true },
          { name: "Email & Social Media promotion", allowed: true },
          { name: "Social Media/Website Link inclusion", allowed: true },
          { name: "Youtube Video Promotion", allowed: true },
          ],
          action: "/payment-plans/top-sellers-plan", 
          memberShipDuration: [
               {months: 1, price: 17500},
               {months: 3, price: 0},
               {months: 6, price: 0},
               {months: 12, price: 0}
          ]
     },
     {
          id:"plan-008",
          title: "Banners",
          price: "Rwf 75,000 /Month",
          mainPrice: 75000,
          location: "https://res.cloudinary.com/dyjahjf1p/image/upload/v1707382694/clickrwanda/pay-plans/banners_adhiw8.png",
          allowed: [
          { name: "Listed in “Our Banners”", allowed: true },
          { name: "Positon on top of the website", allowed: true },
          { name: "Promotion Power: 20x Ad Views", allowed: true },
          { name: "Adress & Contact Visibility", allowed: true },
          { name: "Ads Promoted: All Ads", allowed: true },
          { name: "Personal Support Manager", allowed: true },
          { name: "Email & Social Media promotion", allowed: true },
          { name: "Social Media/Website Link inclusion", allowed: true },
          { name: "Youtube Video Promotion", allowed: true },
          ],
          action: '/payment-plans/banners', 
          memberShipDuration: [
               {months: 1, price: 17500},
               {months: 3, price: 0},
               {months: 6, price: 0},
               {months: 12, price: 0}
          ]
     },
];

export const PlansAllowedFields = [
     "Adress & Contact Visibility",
     "Personal Support Manager",
     "Agents Promotion",
     "Listed in top sellers",
     "Email & Social Media promotion",
     "Youtube Video Promotion",
     "Social Media/Website Link inclusion"
]