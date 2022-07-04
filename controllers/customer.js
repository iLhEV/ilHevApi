import pool from "../db/pool.js";

export const createOrUpdateCustomer = async (req, response) => {
  const customer = req.body;
  if (customer.id) {
    pool.query('update customers set price=$2, currency=$3, time_slots=$4 where id=$1', [customer.id, customer.price, customer.currency, customer.time_slots], async (error, results) => {
      if (error) {
        console.error('error update customer, id: ', customer.id);
        throw error
      }
      console.log('customer updated, id:', customer.id);
      response.send({success: true});
    });
  } else {
    pool.query('insert into customers(price, currency, time_slots, name) values($1, $2, $3, $4)', [customer.price, customer.currency, customer.time_slots, customer.name], async (error, results) => {
      if (error) {
        console.error('error add customer');
        throw error
      }
      console.log('customer added');
      response.send({success: true});
    });
  }
}

export const listCustomers = async (request, response) => {
  pool.query("select * from customers order by id desc", async (error, res) => {
    if (error) {
      console.error('error list customers');
      throw error
    }
    console.log('customers listed, count: ', res.rowCount);
    response.send({ success: true, data: res.rows, meta: { count: res.rowCount } });
  });
}

export const showCustomer = async (request, response) => {
  pool.query("select * from customers where id=$1", [request.params.id], async (error, res) => {
    if (error) {
      console.error('error show customer');
      throw error
    }
    console.log('customer shown, id: ', request.params.id);
    if (res.rows.length) {
      response.send({ success: true, data: res.rows[0] });
    } else {
      response.send({ success: false });
    }
  });
}

export const deleteCustomer = async (request, response) => {
  pool.query("DELETE from customers where id=$1", [request.params.id], async (error, res) => {
    if (error) {
      console.error('error delete customer, id: ', request.params.id);
      throw error
    }
    console.log('customer deleted, id: ', request.params.id);
    response.send({success: true});
  });
}