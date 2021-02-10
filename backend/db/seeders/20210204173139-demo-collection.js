'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Collections', [
	 {
	  name: 'Collection-1',
	  pictures: '',
	  watched: false,
	  userId: 1
	 },
   ])
  },

  down: (queryInterface, Sequelize) => {
	return queryInterface.bulkDelete('Collections', null, {});
  }
};
