package DbTools

import (
	"database/sql"
	"fmt"
	"log"
	_ "github.com/mattn/go-sqlite3"
)

const (
	dbDriverName = "sqlite3"
	//数据库地址
	dbName       = "./data.db3"
)

var db sql.DB

//文章抽象类
type Art struct {
	ArtName string   //文章名
	ArtUrl string    //文章地址
	ComUrl string    //评论地址
	Date string      //最后更新日期
	Type string      //文章分类json格式
	Like int         //点赞数
	View int         //浏览数
	Author string    //作者
}

//初始化数据库
func init() {
	//打开数据库连接(sql中包含数据库连接池)
	db, err = sql.Open(dbDriverName, dbName)
	if checkErr(err) {return}
	//最大连接数
	db.setMaxOpenConns(10)
	//检测并创建表
	err := createTable(db)
	if checkErr(err) {return}
}

//检测并创建表
func createTable(db *sql.DB) error {
	sql := "create table if not exists 'Art' (
		'ArtName' text,
		'ArtUrl' text,
		'ComUrl' text,
		'Date' text,
		'Type' text,
		'Like ' int,
		'View' int,
		'Author' text
	)"
	_, err := db.Exec(sql)
	return err
}

//插入数据
func insertData(art Art) error {
	sql := `insert into Art (ArtName, ArtUrl, ComUrl, Date,Type,Like,View,Author) values(?,?,?,?,?,?,?,?);`
	//获取数据库
	stmt, err := db.Prepare(sql)
	if err != nil {return err}
	//数据库插入
	_, err = stmt.Exec(art.ArtName, art.ArtUrl, art.ComUrl, art.Date,art.Type,art.Like,art.View,art.Author)
	
	return err
}

func queryData(sql string) (l []Art) {
	stmt, err := db.Prepare(sql)
	if err != nil {return err}
	rows, err := stmt.Query()
	if err != nil {return err}
	var result = make([]user, 0)
	for rows.Next() {
		var username, job, hobby string
		var age, id int
		rows.Scan(&id, &username, &age, &job, &hobby)
		result = append(result, user{username, age, job, hobby})
	}
	return result, nil
}

//检测是否错误
func checkErr(e error) bool {
	if e != nil {
		log.Fatal(e)
		return true
	}
	return false
}