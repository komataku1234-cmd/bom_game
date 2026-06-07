package com.example.bom.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import com.example.bom.entity.EntBom;

@Repository
public class SampleDao{
    private final JdbcTemplate db;
    public SampleDao(JdbcTemplate db) {
        this.db = db;
    }
    public void insertDb(EntBom entbom) {
        db.update("INSERT INTO result (name,score) VALUES(?,?)",entbom.getName(),entbom.getScore());
    }
    public List<EntBom> searchDb(){
    String sql = "SELECT * FROM result";
    //データベースから取り出したデータをresultDB1に入れる
    List<Map<String, Object>> resultDb1 = db.queryForList(sql);
    //画面に表示しやすい形のList(resultDB2)を用意
    List<EntBom> resultDb2 = new ArrayList<EntBom>();
    //1件ずつピックアップ
    for(Map<String,Object> result1:resultDb1) {
        //データ1件分を1つのまとまりとしたEntForm型の「entformdb」を生成
        EntBom entformdb = new EntBom();
        //id、nameのデータをentformdbに移す
        entformdb.setId((int)result1.get("id"));
        entformdb.setName((String)result1.get("name"));
        entformdb.setScore((int)result1.get("score"));
        //移し替えたデータを持ったentformdbを、resultDB2に入れる
        resultDb2.add(entformdb);
    }
    //Controllerに渡す
    return resultDb2;
    }
    //削除(DELETE)
    public void deleteDb(Long id) {
    //コンソールに表示
    System.out.println("削除しました");
    //DBからデータを削除
    db.update("DELETE FROM result WHERE id=?", id);
    }
    //更新画面の表示(SELECT)
    public List<EntBom> selectOne(Long id) {
        //コンソールに表示
        System.out.println("編集画面を出します");
        //データベースから目的の1件を取り出して、そのままresultDB1に入れる
        List<Map<String, Object>> resultDb1 = db.queryForList("SELECT * FROM result where id=?", id);
        //画面に表示しやすい形のList(resultDB2)を用意
        List<EntBom> resultDb2=new ArrayList<EntBom>();
        //1件ずつピックアップ
        for(Map<String,Object> result1:resultDb1) {
        //データ1件分を1つのまとまりとするので、EntForm型の「entformdb」を生成
        EntBom entformdb = new EntBom();
        //id、nameのデータをentformdbに移す
        entformdb.setId((int)result1.get("id"));
        entformdb.setName((String)result1.get("name"));
        entformdb.setScore((int)result1.get("score"));
        //移し替えたデータを持ったentformdbを、resultDB2に入れる
        resultDb2.add(entformdb);
    }
    //Controllerに渡す
    return resultDb2;
    }
    //更新の実行(UPDATE)
    public void updateDb(Long id, EntBom entform) {
    //コンソールに表示
    System.out.println("編集の実行");
    //UPDATEを実行
    db.update("UPDATE result SET name = ? WHERE id = ?",entform.getName(), id);
    }
}