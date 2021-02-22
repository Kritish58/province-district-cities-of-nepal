const parent = require('./province_and_district');
const child = require('./district_and_city');
var fs = require('fs');

const res = parent.map((parent_item) => {
   child.forEach((child_item) => {
      if (child_item.district.includes(parent_item.district)) {
         parent_item.cities = [...parent_item.cities, child_item.city];
      }
   });
   return parent_item;
});

fs.writeFile('result.json', JSON.stringify(res), function (err) {
   if (err) {
      console.log('ERROR', err);
      return;
   }
   console.log('success');
});
