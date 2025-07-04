const mongoose = require('mongoose');
require('./db/config');
const Admin = require('./db/Admin/Admin');

const adminUsers = [
  {
    name: 'Talari Narendra',
    email: 'narendratalari695@gmail.com',
    password: 'BOOKNEST'
  },
  {
    name: 'devika',
    email: 'devika123@gmail.com',
    password: 'BOOKNEST'
  }
];

async function addAdminUsers() {
  try {
    console.log('Adding/updating admin users...');

    for (const userData of adminUsers) {
      // Check if user already exists by email
      let admin = await Admin.findOne({ email: userData.email });

      if (admin) {
        // Update existing user
        admin.name = userData.name;
        admin.password = userData.password;
        await admin.save();
        console.log(`Updated admin user: ${userData.email}`);
      } else {
        // Create new user
        admin = new Admin(userData);
        await admin.save();
        console.log(`Added new admin user: ${userData.email}`);
      }
    }

    console.log('Admin users operation complete.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error adding/updating admin users:', error);
    mongoose.connection.close();
  }
}

addAdminUsers();