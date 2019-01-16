// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      user:     'devinkrok',
      password: '',
      database: 'purchase',
  },
  migrations: {
    directory: './migrations'
  }
},

  production: {
    client: 'postgresql',
    connection: {
      user:     'devinkrok',
      password: '',
      database: 'purchase'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations'
    }
  }

};
