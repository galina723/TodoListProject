import SQLite from 'react-native-sqlite-storage';

export class Database {
  static async openDB() {
    const openDB = await SQLite.openDatabase({
      name: 'database.db',
    });

    return openDB;
  }

  static async createTable({
    tableName,
    column,
  }: {
    tableName: string;
    column: string;
  }) {
    const open = await this.openDB();

    open.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE ${tableName} (${column})`,
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

    for (var i = 0; i < countColumn - 1; i++) {
      request += ', ?';
    }

    return new Promise((resolve, reject) => {
      open.transaction(tx => {
        tx.executeSql(
          `INSERT INTO ${tableName} (${column}) VALUES (${request})`,
          data,
          () => {
            console.log('1111success');
            resolve(true);
          },
          error => {
            console.log(222222, error);
            resolve(false);
          },
        );
      });
    });
  }

  static async selectTable(tableName: string, column?: string) {
    const open = await this.openDB();

    const customColoumn = column ?? '*';

    return new Promise((resolve, reject) => {
      open.transaction(tx => {
        tx.executeSql(
          `SELECT ${customColoumn} FROM ${tableName}`,
          [],
          (_, res) => {
            var result: any[] = [];

            var length = res.rows.length;
            if (length > 0) {
              for (var i = 0; i < length; i++) {
                result.push(res.rows.item(i));
              }
            }
            resolve(result);
            console.log('success', result);
          },
          error => {
            console.log(error);
          },
        );
      });
    });
  }

  static async updateTable(
    tableName: string,
    data: any[],
    column: string,
    condition: string,
  ) {
    const open = await this.openDB();

    const columnTemp = column.split(', ');
    const length = columnTemp.length;

    var request = '';

    for (var i = 0; i < length; i++) {
      request += columnTemp[i] + ' = ?' + (i !== length - 1 ? ', ' : '');
    }

    console.log(request);

    return new Promise((resolve, reject) => {
      open.transaction(tx => {
        tx.executeSql(
          `UPDATE ${tableName} SET ${request} ${condition}`,
          data,
          () => {
            console.log('success');
            resolve(true);
          },
          error => {
            console.log(error);
            resolve(false);
          },
        );
      });
    });
  }

  static async deleteTable(tableName: string, condition: string) {
    const open = await this.openDB();

    return new Promise((resolve, reject) => {
      open.transaction(tx => {
        tx.executeSql(
          `DELETE FROM ${tableName} ${condition}`,
          [],
          () => {
            console.log('success');
            resolve(true);
          },
          error => {
            console.log(error);
            resolve(false);
          },
        );
      });
    });
  }
}
