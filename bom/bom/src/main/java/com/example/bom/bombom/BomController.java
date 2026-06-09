package com.example.bom.bombom;

import java.util.List;

import org.springframework.stereotype.Controller; // コントローラーとして動作させるためのアノテーション
import org.springframework.ui.Model; // HTMLにデータを渡すためのModelオブジェクト
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping; // URLとメソッドを結びつけるアノテーション

import com.example.bom.dao.SampleDao;
import com.example.bom.entity.EntBom;

@Controller // このクラスがSpringのコントローラー（Webリクエストを処理する）であることを示す
public class BomController {
    @RequestMapping("/") // 「/sample」にアクセスがあったとき、このメソッドが実行される
    public String top(Model model) {
        model.addAttribute("title", "💣game"); // "title" という名前で "Hello World" をHTMLに渡す
        return "bombom/index"; // 「index.html」などのテンプレートを表示する
    }
    @RequestMapping("/bom")
    public String confirm(Model model , Input input) {
        return "bombom/bom";
    }
    // SampleDaoの用意
    private final SampleDao sampledao;
    public BomController(SampleDao sampledao) {
        this.sampledao = sampledao;
    }
    @RequestMapping("/save")
    public String save(Model model , Input input) {
        EntBom entbom = new EntBom();
        entbom.setName(input.getName());
        entbom.setScore(input.getScore());
        sampledao.insertDb(entbom);
        return "redirect:/result";
    }
    @RequestMapping("/result")
    public String result(Model model , Input input) {
        List<EntBom> list = sampledao.searchDb();
        model.addAttribute("dbList",list);
        model.addAttribute("title","一覧ページ");
        return "/bombom/result";
    }
    //削除(DELETE)
    @RequestMapping("/del/{id}")
    public String destory(@PathVariable Long id) {
        sampledao.deleteDb(id);
        return "redirect:/result";
    }

    @RequestMapping("/pass/{id}")
    public String pass(@PathVariable Long id,Model model,Pass pass) {
        model.addAttribute("title","入力ページ");
        model.addAttribute("id", id);
        return "bombom/pass";
    }
    @RequestMapping("/edit/{id}")
    public String edit(@PathVariable Long id,@Validated Pass pass, BindingResult result, Model model,Input input) {
        //DBからデータを1件取ってくる(データ型はリスト)
        List<EntBom> list = sampledao.selectOne(id);
        //リスト形式のため、インデックス番号が0のオブジェクトを抽出
        EntBom entformdb = list.get(0);
        //編集画面用のViewに、データ２つを送る
        model.addAttribute("data", entformdb);
        if((result.hasErrors())) {
            model.addAttribute("title","確認ページ");
            model.addAttribute("id", id);
            return "bombom/pass";
        }
        model.addAttribute("title", "編集ページ");
        return "bombom/edit";
    }
    //更新処理(UPDATE)
    @RequestMapping("/edit/{id}/exe")
    public String editExe(@PathVariable Long id, Model model, Input input) {
    //フォームの値をエンティティに入れ直し
    EntBom entform = new EntBom();
    entform.setName(input.getName());
    //更新の実行
    sampledao.updateDb(id,entform);
    //一覧画面へリダイレクト
    return "redirect:/result";
    }
    
}
