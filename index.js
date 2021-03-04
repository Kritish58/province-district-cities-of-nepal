const parent = require('./province_and_district');
const child = require('./district_and_city');
var fs = require('fs');
const _ = require('underscore');

let res = parent.map((parent_item) => {
   child.forEach((child_item) => {
      if (child_item.district.includes(parent_item.district)) {
         parent_item.cities = [
            ...parent_item.cities,
            child_item.city.replace("'", '').replace("'", '').replace(' ', ''),
         ];
      }
   });
   return parent_item;
});

res = res.map((item) => {
   return {
      ...item,
      cities: item.cities.filter((city, index) => {
         if (index !== 0) {
            return city;
         }
      }),
   };
});

const grouped = _.groupBy(res, 'province');

fs.writeFile('result.json', JSON.stringify(grouped), function (err) {
   if (err) {
      console.log('ERROR', err);
      return;
   }
   console.log('success');
});
