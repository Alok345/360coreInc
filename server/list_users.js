const { User } = require('./src/models');

async function listUsers() {
    try {
        const users = await User.findAll({
            attributes: ['id', 'email', 'password', 'referralCode']
        });
        console.log('Users in database:');
        users.forEach(u => {
            console.log(`ID: ${u.id}, Email: ${u.email}, Hash: ${u.password}, Ref: ${u.referralCode}`);
        });
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

listUsers();
