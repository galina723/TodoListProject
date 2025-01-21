import SQLite from 'react-native-sqlite-storage';

export class Database {
  static async openDB() {
    const openDB = await SQLite.openDatabase({
      name: 'database.db',
    });

    return openDB;
  }

  static async createTable(tableName: string, column: string) {
    const open = await this.openDB();

    open.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, ${column})`,
        [],
        () => {
          console.log('success');
        },
        error => {
          console.log(error);
        },
      );
    });
  }

  static async insertTable(tableName: string, data: any[], column: string) {
    const open = await this.openDB();

    const countColumn = column.split(', ').length;
    var request = '?';

    for (var i = 0; i < column.length; i++) {
      request += ', ?';
    }

    open.transaction(tx => {
      tx.executeSql(
        `INSERT INTO ${tableName} (${column}) VALUES (${request})`,
        data,
        () => {
          console.log('success');
        },
        error => {
          console.log(error);
        },
      );
    });
  }
}
