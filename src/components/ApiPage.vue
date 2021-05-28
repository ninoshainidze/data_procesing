<template>
  <div class="hello">
    <button v-on:click="logout()" class="signin-button">Log Out</button>
    <br />
    <br />
    <div style="display: flex; margin-bottom: 20px">
      <div class="filter" style="margin-right: 20px">
        <label for="" style="margin-right: 5px">Lot filter</label>
        <input type="text" v-model="lot" />
        <button class="signin-button" v-on:click="lot_filter()">Filter</button>
      </div>
      <div class="filter" style="margin-right: 5px">
        <label for="" style="margin-right: 10px">Vin filter</label>
        <input type="text" v-model="vin" />
        <button class="signin-button" v-on:click="vin_filter()">Filter</button>
      </div>
      <div class="filter" style="margin-right: 5px">
        <label for="" style="margin-right: 10px">User filter</label>
        <input type="text" v-model="userid" />
        <button class="signin-button" v-on:click="user_filter()">Filter</button>
      </div>
      <button
        style="margin-left: 30px"
        class="signin-button"
        v-on:click="clear()"
      >
        Clear All
      </button>
    </div>
    <div class="status">
      <select v-model="status">
        <option value="select column" disabled>select column</option>
        <option value="Different_user">Different user</option>
        <option value="multiply_user">multiply user</option>
        <option value="Different_count">Different count</option>
      </select>
      <button>submit</button>
    </div>
    <div style="display: flex">
      <div>
        <h1 style="text-align: center">API</h1>
        <div class="api" style="display: flex">
          <table>
            <tr>
              <th>lot id</th>
              <th>users id</th>
              <th>date</th>
              <th>amount</th>
              <th>vin</th>
              <th>Count</th>
            </tr>
            <tr v-for="count in concat_array" :key="count.id">
              <td>{{ count["value"][0] }}</td>
              <td>{{ count["value"][1] }}</td>
              <td>{{ count["value"][2] }}</td>
              <td>{{ count["value"][3] }}</td>
              <td>{{ count["value"][4] }}</td>
              <td>{{ count["value"][5] }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div>
        <h1 style="text-align: center">Firebase API</h1>
        <div class="firebase_api">
          <table>
            <tr>
              <th>Lot number</th>
              <th>firebase user id</th>
              <th>firebase date</th>
              <th>amount</th>
              <th>count</th>
            </tr>

            <tr v-for="item in items" :key="item.id">
              <td>{{ item["value"][0] }}</td>
              <td>{{ item["value"][1] }}</td>
              <td>{{ item["value"][2] }}</td>
              <td>{{ item["value"][3] }}</td>
              <td>{{ item["value"][4] }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div>
        <h1 style="text-align: center">status</h1>
        <div>
          <table>
            <tr>
              <th>status</th>
            </tr>

            <tr>
              <td>status</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <paginate
      :page-count="20"
      :page-range="3"
      :margin-pages="2"
      :click-handler="clickCallback"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'hello'"
      :page-class="'page-item'"
    ></paginate>
  </div>
</template>
<script>
const axios = require("axios");
import db from "../firebase";
export default {
  name: "api",
  data() {
    return {
      lot: "",
      vin: "",
      userid: "",

      bids_data: [],
      auction_data: [],
      marge1: [],
      marge2: [],
      concat_array: [],
      clone_concat: [],

      firebase_table: [],

      counts: [],

      count_firebase: {},

      result: [],
      items: [],
      // clone
      clone_items: [],

      bids: [],

      accessToken: "",
      logged: "",

      status: "select column",

      pread_array: [],
    };
  },

  mounted() {
    this.logged = this.$cookies.get("logged");
    if (this.logged) {
      this.$router.push("/apipage").catch(() => {});
      this.accessToken = this.$cookies.get("accessToken");
    } else {
      this.$router.push("/").catch(() => {});
    }
    if (this.logged) {
      this.getdata_firebase();
      this.get_bid_and_auction();
    }
  },
  methods: {
    clear() {
      if (this.clone_concat.length) {
        this.concat_array = this.clone_concat;
      }
      if (this.clone_items.length) {
        this.items = this.clone_items;
      }
      this.lot = "";
    },
    lot_filter() {
      //API filter
      if (!this.clone_concat.length) {
        this.clone_concat = this.concat_array;
      }
      var myarray = [];
      this.concat_array = this.clone_concat;
      this.concat_array.forEach((element) => {
        if (element.value[0].includes(this.lot)) {
          myarray.push({
            value: [
              element.value[0],
              element.value[1],
              element.value[2],
              element.value[3],
              element.value[4],
              element.value[5],
            ],
          });
        }
      });
      this.concat_array = myarray;

      //firebase filter
      if (!this.clone_items.length) {
        this.clone_items = this.items;
      }
      this.items = this.clone_items;
      var firebaseArray = [];
      // console.log(this.items);
      this.items.forEach((element) => {
        if (element.value[0].includes(this.lot)) {
          firebaseArray.push({
            value: [
              element.value[0],
              element.value[1],
              element.value[2],
              element.value[3],
              element.value[4],
              element.value[5],
            ],
          });
        }
      });
      this.items = firebaseArray;
    },
    user_filter() {
      //API filter
      if (!this.clone_concat.length) {
        this.clone_concat = this.concat_array;
      }
      var myarray = [];
      this.concat_array = this.clone_concat;
      this.concat_array.forEach((element) => {
        if (element.value[1].toString().includes(this.userid)) {
          myarray.push({
            value: [
              element.value[0],
              element.value[1],
              element.value[2],
              element.value[3],
              element.value[4],
              element.value[5],
            ],
          });
        }
      });
      this.concat_array = myarray;

      //firebase filter
      if (!this.clone_items.length) {
        this.clone_items = this.items;
      }
      this.items = this.clone_items;
      var firebaseArray = [];
      // console.log(this.items);
      this.items.forEach((element) => {
        if (element.value[1].toString().includes(this.userid)) {
          firebaseArray.push({
            value: [
              element.value[0],
              element.value[1],
              element.value[2],
              element.value[3],
              element.value[4],
              element.value[5],
            ],
          });
        }
      });
      this.items = firebaseArray;
    },
    vin_filter() {
      //API filter
      if (!this.clone_concat.length) {
        this.clone_concat = this.concat_array;
      }
      var myarray = [];
      this.concat_array = this.clone_concat;
      this.concat_array.forEach((element) => {
        if (element.value[4].includes(this.vin)) {
          myarray.push({
            value: [
              element.value[0],
              element.value[1],
              element.value[2],
              element.value[3],
              element.value[4],
              element.value[5],
            ],
          });
        }
      });
      this.concat_array = myarray;

      //firebase filter
      // if (!this.clone_items.length) {
      //   this.clone_items = this.items;
      // }
      // this.items = this.clone_items;
      // var firebaseArray = [];
      // console.log(this.items);
      // this.items.forEach((element) => {
      //   console.log(typeof element.values[4]);
      //   if (element.value[4].includes(this.vin)) {
      //     firebaseArray.push({
      //       value: [
      //         element.value[0],
      //         element.value[1],
      //         element.value[2],
      //         element.value[3],
      //         element.value[4],
      //         element.value[5],
      //       ],
      //     });
      //   }
      // });
      // this.items = firebaseArray;
    },
    logout() {
      this.$cookies.remove("logged");
      this.$cookies.remove("accessToken");
      this.$router.push("/");
    },
    clickCallback(pageNum) {
      console.log(pageNum);
    },
    async getdata_firebase() {
      await db
        .collection("bidLog")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.items.push(doc.data());

            this.firebase_table = [];
            this.items.forEach((element) => {
              this.firebase_table.push([
                element.lot,
                element.dealerId,
                element.dateTime,
                element.amount,
              ]);
            });
          });
          this.items = Object.values(
            this.compressArray(Object.values(this.firebase_table))
          );
        });
      this.sorting_data();
    },

    async get_bid_and_auction() {
      const headers = {
        "Content-Type": "application/json",
        accept: "text/plain",
        Authorization: "Bearer " + this.accessToken,
      };
      var bad_response = false;
      let auction_data = await axios
        .get(
          "https://cprtapistage.caucasusauto.com/api/v1/auction-wins?Page=1&PageSize=100",
          { headers }
        )
        .catch(function (response) {
          console.log(response);
          bad_response = true;
        });

      let bids_data = await axios
        .get(
          "https://cprtapistage.caucasusauto.com/api/v1/bid?Page=1&PageSize=100",
          { headers }
        )
        .catch(function (response) {
          console.log(response);
          bad_response = true;
        });

      if (bad_response) this.logout();
      this.bids_data = bids_data.data;
      this.auction_data = auction_data.data;

      this.bids_data.data.bids.forEach((bids) => {
        this.marge1.push(bids);
      });
      this.auction_data.data.auctionWins.forEach((auction) => {
        this.marge2.push(auction);
      });

      this.concat_array = this.marge1.concat(this.marge2);

      var test_array = [];
      this.concat_array.forEach((element) => {
        test_array.push([
          element.lot,
          element.applicationUserId,
          element.createdOn,
          element.amount,
          element.vin,
        ]);
      });

      this.concat_array = Object.values(
        this.compressArray(Object.values(test_array))
      );
    },
    sorting_data() {
      var api_copy = this.concat_array;
      var firebase_copy = this.items;
      // console.log(firebase_copy);
      var position_number = 0;
      api_copy.forEach((api) => {
        console.log("ssssss");
        firebase_copy.forEach((firebase) => {
          console.log(api.value[0], firebase.value[0]);
          if (api.value[0] == firebase.value[0]) {
            api.value.push(position_number);
            firebase.value.push(position_number);
            position_number++;
            console.log(position_number);
          }
        });
      });
      // console.log(position_number);
      var comon_num = position_number;
      console.log(comon_num);
      var len = api_copy.length;
      // var firebase_index = firebase_copy.length - comon_num;
      for (var i = 0; i < len; i++) {
        // console.log("for");
        if (api_copy[i].value.length == 6) {
          api_copy[i].value.push(position_number);
          position_number++;
        }
        if (i == api_copy.length - 1) {
          // console.log(firebase_copy.length);
          // api_copy[117] = { value:[1,2,3,4,5,6]}
          // for( var k =0; k<)
        }
        console.log("sss");
      }

      console.log(api_copy);
    },

    compressArray(original) {
      var compressed = [];
      var copy = original.slice(0);

      for (var i = 0; i < original.length; i++) {
        var myCount = 0;
        var users = [];
        for (var w = 0; w < copy.length; w++) {
          if (copy[w]) {
            if (!users.length) {
              users.push(original[i][1]);
            }
            if (original[i][0] == copy[w][0]) {
              if (original[i][1] != copy[w][1]) {
                var insert = true;
                for (const user in users) {
                  if (users[user] == copy[w][1]) {
                    insert = false;
                  }
                  // console.log(users[user]);
                }
                if (insert) users.push(copy[w][1]);
              }
              myCount++;
              delete copy[w];
            }
          }
        }

        if (myCount > 0) {
          var a = new Object();
          original[i][1] = users;
          original[i].push(myCount);
          a.value = original[i];
          compressed.push(a);
        }
      }
      return compressed;
    },
  },
};
</script>
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
.signin-button {
  outline: none;
  border: none;
  cursor: pointer;
  width: 100px;
  height: 40px;
  border-radius: 30px;
  font-weight: 700;
  color: #fff;
  background: #24cfaa;
  box-shadow: 3px 3px 8px #b1b1b1, -3px -3px 8px #ffffff;
  transition: 0.5s;
}
.signin-button:hover {
  background: #5ae0c3;
}
.filter input {
  border: 1px solid black;
  border-radius: 5px;
  outline: none;
  background: none;
  font-size: 18px;
  color: #555;
  height: 30px;
}
.filter button {
  margin-left: 10px;
}
</style>
