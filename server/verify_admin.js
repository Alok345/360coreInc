const bcrypt = require('bcryptjs');
const hash = '$2b$10$sPcQvEACDRVPBd4GgD8RGudW2hJWieaaF8vWQi.GSBnQujr0eloQC';
const pass = 'admin123';

async function verify() {
    const isMatch = await bcrypt.compare(pass, hash);
    console.log('Match for admin123:', isMatch);
}

verify();
