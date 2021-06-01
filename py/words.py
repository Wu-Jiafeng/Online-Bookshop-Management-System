# coding=UTF-8
from flask import Flask,request
import json
import pymysql
import nltk
import re
import jieba

app = Flask(__name__)
@app.route('/tokenize/',methods=['GET','POST'])

def getdata():
    data = json.loads(request.form.get('data'))
    conn = pymysql.connect(host="localhost", user="root", password="123456", db="bookdb_12", charset="utf8")
    (CHN,ENG,BookID)=(data['u_CHN'],data['u_ENG'],data['u_BookID'])
    chinese_tokenize(CHN,BookID,conn)
    english_tokenize(ENG,BookID,conn)
    conn.close()

def chinese_tokenize(data,BookID,conn):
    cursor = conn.cursor()
    sel_sql = "DELETE FROM tb_vocabularychn WHERE BookID="+BookID+";"
    cursor.execute(sel_sql)
    conn.commit()
    data=re.sub(r"[0-9\s+\.\!\/_,$%^*()?;；:-【】+\"\']+|[+——！，;:。？、~@#￥%……&*（）]+", " ",data)
    seg_list=list(set(jieba.lcut_for_search(data)))
    for jj in seg_list:
        sel_sql = "INSERT into tb_vocabularychn (BookID,Words) VALUES(%s, '%s');"%(int(BookID),jj)
        cursor.execute(sel_sql)
        conn.commit()
    print(seg_list)
    cursor.close()
    return
    # data2 = data2.append([{'Number': book_ID, 'Words': str(ii)}], ignore_index=True)

def english_tokenize(data,BookID,conn):
    cursor = conn.cursor()
    sel_sql = "DELETE FROM tb_vocabularyeng WHERE BookID=" + BookID + ";"
    cursor.execute(sel_sql)
    conn.commit()
    data = (re.sub(r'[{}]+'.format('!,;:?"\''),'',data)).strip().lower()
    seg_list = list(set(nltk.word_tokenize(data)))
    for jj in seg_list:
        sel_sql = "INSERT into tb_vocabularyeng (BookID,Words) VALUES(%s, '%s');"%(int(BookID),jj)
        cursor.execute(sel_sql)
        conn.commit()
    print(seg_list)
    cursor.close()
    return

if __name__ == '__main__':
    app.run(debug=True)

