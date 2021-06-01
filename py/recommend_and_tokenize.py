# coding=UTF-8
from flask import Flask,request
import pymysql
import numpy as np
import heapq
import json
import nltk
import re
import jieba
app = Flask(__name__)

@app.route('/name/',methods=['GET','POST'])

def operation():
    flag=request.form.get('flag')
    conn = pymysql.connect(host="localhost", user="root", password="123456", db="bookdb_12", charset="utf8")
    if flag == 'true':
        getdata(json.loads(request.form.get('data')),conn)
    else:
        updateRecommend(conn)
    return

def getdata(data,conn):
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

def updateRecommend(conn):
    max_n = 3
    cursor = conn.cursor()
    user_dict,book_dict,user_id,book_id,user_num,book_num=getBookNUser(cursor)
    data = np.zeros((user_num, book_num))
    data=initialCommentScores(data,cursor,user_dict,book_dict)
    result = [[0 for ii in range(3)]for jj in range(user_num)]
    t = grad_ascent(data, 4)
    t = t.getA()
    for ii in range(user_num):
        temp = t[ii].tolist()
        result[ii] = list(map(temp.index, heapq.nlargest(max_n, temp)))
        for jj in range(3):
            result[ii][jj] += 1
    insert2database(result,conn,book_id,user_id)
    cursor.close()
    conn.close()
    print(result)
    return result

# 梯度下降
def grad_ascent(data, K):
    data_mat = np.mat(data)
    m, n = np.shape(data_mat)
    p = np.mat(np.random.random((m, K)))
    q = np.mat(np.random.random((K, n)))
    alpha = 0.0002
    beta = 0.2
    max_cycle = 8000
    for step in range(max_cycle):
        for ii in range(m):
            for jj in range(n):
                if data_mat[ii, jj] > 0:
                    error = data_mat[ii, jj]
                    for k in range(K):
                        error = error - p[ii, k] * q[k, jj]
                    for k in range(K):
                        p[ii, k] = p[ii, k] + alpha * (2 * error * q[k, jj] - beta * p[ii, k])
                        q[k, jj] = q[k, jj] + alpha * (2 * error * p[ii, k] - beta * q[k, jj])

        loss = 0.0
        for ii in range(m):
            for jj in range(n):
                if data_mat[ii, jj] > 0:
                    error = 0.0
                    for k in range(K):
                        error = error + p[ii, k] * q[k, jj]
                    loss = (data_mat[ii, jj] - error) * (data_mat[ii, jj] - error)
                    for k in range(K):
                        loss = loss + beta * (p[ii, k] * p[ii, k] + q[k, jj] * q[k, jj]) / 2
        if loss < 0.001:
            break
    result1 = p * q
    for ii in range(m):
        for jj in range(n):
            if data_mat[ii, jj] != 0:
                result1[ii, jj] = 0
    return result1

def getBookNUser(cursor):
    sel_sql = "select BookID from tb_bookinfo;"
    cursor.execute(sel_sql)
    result_book=cursor.fetchall()
    book_id=[result_book[i][0] for i in range(len(result_book))]
    book_num=len(book_id)
    sel_sql = "select CustomerID from tb_customerinfo;"
    cursor.execute(sel_sql)
    result_user = cursor.fetchall()
    user_id = [result_user[i][0] for i in range(len(result_user))]
    user_num=len(user_id)
    user_dict=dict(zip(user_id,range(user_num)))
    book_dict = dict(zip(book_id, range(book_num)))
    return user_dict,book_dict,user_id,book_id,user_num,book_num

def initialCommentScores(data,cursor,user_dict,book_dict):
    sel_sql = "select CustomerID,BookID,CommentScore from tb_commentinfo where CommentFlag='通过审核';"
    cursor.execute(sel_sql)
    res = cursor.fetchall()
    for i in range(len(res)):
        (cid,bid,score)=res[i]
        data[user_dict[cid]][book_dict[bid]]=score
    return data

def insert2database(result,conn,book_id,user_id):
    sel_sql = "DELETE FROM tb_bookrecommend;"
    cursor = conn.cursor()
    cursor.execute(sel_sql)
    conn.commit()
    for i in range(len(result)):
        for j in range(3):
            bid=book_id[result[i][j]]
            cid=user_id[i]
            sel_sql = "INSERT into tb_bookrecommend (BookID,CustomerID) VALUES("+str(bid)+","+str(cid)+");"
            cursor.execute(sel_sql)
            conn.commit()
    cursor.close()
    return

if __name__ == '__main__':
    app.run(debug=True)

