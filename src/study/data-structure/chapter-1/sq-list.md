---
title: 第一幕：顺序表
icon: material-symbols:power-outline
order: 1
category:
  - 数据结构
tag:
  - C/C++
  - 线性表
  - 顺序表
---

## 序

线性表的第一种物理实现——顺序表，将逻辑上相邻的元素存放在物理上也相邻的存储单元中[^first] 。这种看似直接的映射，却奠定了随机访问与紧凑存储的基础。理解顺序表，就是理解数组在动态场景下的延伸和局限，也是让我们迈向更高级与复杂的数据结构的起点。

这一幕，我们将从数组出发，逐步探索顺序表的定义、存储结构、核心操作以及边界处理。我们将用C语言来实现一个可动态扩容的顺序表，并在实现的过程中体会到时间与空间的取舍、封装与接口的设计，以及防御性编程的意义。

## 顺序表的概念与结构

### 顺序表的定义与结构

  - 逻辑结构： 线性表，元素间为线性关系。
  - 物理结构： 一组相邻的内存单元。
  - 关键特征： 随机访问（通过数组下标`a[i]`准确定位）、存储密度高，但插入/删除需移动元素。

### 顺序表的类型
  - 定长顺序表： 由静态数组实现，容量固定，简单但容易溢出。
  - 动态顺序表： 由动态数组实现，按需扩容，更灵活。

好的，了解了顺序表的定义、结构与类型后，我们现在来设计一个最简单的顺序表。 

一个顺序表可以定义为一个结构体。
```C
typedef struct {
    int *data;      // 指向顺序表实际分配的内存的指针
    size_t size;       // 顺序表当前元素的个数
    size_t capacity;   // 当前分配的容量
} SqList;
```
一个顺序表通常有以下操作：
  - 初始化： 分配初始容量
  - 销毁： 释放分配给顺序表的内存，避免内存泄漏
  - 调整大小： 调整分配的顺序表的大小
  - 插入： 在指定位置插入元素（检查容量，并移动后续元素）
  - 移除： 移除指定位置的元素（移除元素后需要移动后续元素）
  - 按位查找： 返回第 i 个元素
  - 按值查找： 返回第一个匹配的元素的位置
  - 打印： 遍历输出所有元素


## 顺序表的实现

我们将为现在这个顺序表来实现上述操作。

### 创建顺序表
```C
SqList *createSqList(int capacity) {
  if (capacity <= 0)    // 检查设定容量是否小于等于0（无效分配的顺序表大小）
    return NULL;  // 如果是，则直接返回NULL

  SqList *sqList = (SqList *)malloc(sizeof(SqList));    // 为顺序表结构体分配内存空间
  if (sqList == NULL)   // 检查是否分配成功
  
    return NULL;  // 若分配内存失败则返回NULL

  int *data = (int *)calloc(capacity, sizeof(int));     // 为数据区分配内存空间
  if (data == NULL) {   // 同样检查
    free(sqList);
    return NULL;
  }

  sqList->data = data;          //设定初始值
  sqList->size = 0;
  sqList->capacity = capacity;
  return sqList;
}
```
若分配成功，我们调用这个函数，传入正确的参数之后，就可以得到一个顺序表结构体的指针。拿到这个指针后，就可以进行下一步操作了。

### 销毁顺序表
```C
void destroySqList(SqList *sqList) {
  if (sqList == NULL)
    return;

  free(sqList->data);
  sqList->data = NULL;
  free(sqList);
}
```
注意销毁完成后自行把顺序表的指针置为NULL，避免UAF和double free。

### 调整顺序表大小

顺序表也拥有调整大小的能力。
```C
bool updateSqListCapacity(SqList *sqList, int capacity) {
  if (sqList == NULL || capacity == 0)      
  // 防御性编程 1. 避免使用空值以及越界值
    return false;

  int *tmp = realloc(sqList->data, sizeof(int) * capacity); // 重新为SqList的data区分配内存

  if (tmp == NULL)      
    // 防御性编程 2. 依旧避免使用空值，并且为了稳定，我们不free掉原有的sqList
    return false;       
    // 而是返回一个false，供调用者自行判断是否分配成功
    

  sqList->data = tmp;
  if (capacity <= sqList->size)
    sqList->size = capacity;        // 防御性编程 3. 如果顺序表当前元素的个数比容量大
  sqList->capacity = capacity;                  // 则削去越界部分的元素

  return true;          // 分配成功，返回true
}
```

### 对顺序表进行元素的插入和移除

插入与移除操作要求我们对顺序表元素进行移动。其时间复杂度是O(n)。
```C
bool insertSqListElem(SqList *sqList, size_t pos, int data) {
  if (sqList == NULL || pos > sqList->size)
    return false;

  if (sqList->size == sqList->capacity) {
    int new_capacity = (sqList->capacity == 0) ? 1 : sqList->capacity * 2;  
    // 判空
    if (!updateSqListCapacity(sqList, new_capacity))
      return false;
  }

  memmove(&sqList->data[pos + 1], &sqList->data[pos],
          (sqList->size - pos) * sizeof(int));

  sqList->data[pos] = data;
  sqList->size++;
  return true;
}

bool removeSqListElem(SqList *sqList, size_t pos) {
  if (sqList == NULL || pos >= sqList->size)
    return false;

  if (pos < sqList->size - 1)
    memmove(&sqList->data[pos], &sqList->data[pos + 1],
            (sqList->size - pos - 1) * sizeof(int));
  sqList->size--;
  return true;
}
```

### 顺序表的查找

查找分为按索引查找与按值查找。按索引查找的时间复杂度是O(1)，按值查找的时间复杂度是O(n)。
```C
bool getSqListByIndex(int *result, SqList *sqList, size_t idx) {
  if (sqList == NULL || result == NULL || idx >= sqList->size)
    return false;

  *result = sqList->data[idx];
  return true;
}

bool getSqListByData(size_t *idx, SqList *sqList, int data) {
  if (sqList == NULL || idx == NULL || sqList->data == NULL)
    return false;

  for (size_t i = 0; i < sqList->size; ++i) {
    if (sqList->data[i] == data) {
      *idx = i;
      return true;
    }
  }
  return false;
}

```

### 查看顺序表所有元素

最后是输出我们的顺序表的所有元素。它的时间复杂度是O(n)。
```C
void showSqListElem(SqList *sqList) {
  if (sqList == NULL || sqList->data == NULL)
    return;
  for (size_t i = 0; i < sqList->size; ++i)
    printf("sqList[%zu]=%d\n", i, sqList->data[i]);
}
```

实现完了这些函数，我们来进行一下测试。我们使用`time.h`的`clock`函数来进行计时，这样可以大致判断我们写的函数的实际性能到底如何。
> 注意：clock() 测量的是 CPU 时间，而非真实的挂钟时间。对于微秒级的操作，建议将操作重复多次（如 10⁶ 次）取平均值，以消除单次调用的误差。

```C
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <time.h>

// 这里放置之前定义的所有结构体和函数（createSqList, destroySqList, 
// updateSqListCapacity, insertSqListElem, removeSqListElem, 
// getSqListByIndex, getSqListByData, showSqListElem）

// 辅助函数：打印顺序表（美化版）
void printSqList(SqList *list) {
    if (!list) {
        printf("顺序表为空\n");
        return;
    }
    printf("size = %d, capacity = %d, elements: ", list->size, list->capacity);
    for (int i = 0; i < list->size; i++) {
        printf("%d ", list->data[i]);
    }
    printf("\n");
}

int main() {
    // 1. 正确性测试
    printf("========== 正确性测试 ==========\n");
    SqList *list = createSqList(2);   // 初始容量为2，便于测试扩容
    if (!list) {
        printf("创建失败\n");
        return 1;
    }

    // 插入元素
    insertSqListElem(list, 0, 10);   // 头部插入
    insertSqListElem(list, 1, 20);   // 尾部插入
    insertSqListElem(list, 2, 30);   // 应触发扩容
    insertSqListElem(list, 1, 15);   // 中间插入
    printSqList(list);   // 预期：10 15 20 30

    // 删除元素
    removeSqListElem(list, 1);       // 删除索引1（即15）
    printSqList(list);               // 预期：10 20 30

    // 查找
    int val;
    if (getSqListByIndex(&val, list, 2)) {
        printf("索引2的元素 = %d\n", val);   // 30
    }
    size_t idx;
    if (getSqListByData(&idx, list, 20)) {
        printf("元素20的位置 = %zu\n", idx); // 1
    }

    // 打印全部
    printf("顺序表内容: \n");
    showSqListElem(list);
    printf("\n");

    // 销毁
    destroySqList(list);

    // 2. 性能测试
    printf("\n========== 性能测试 ==========\n");

    const int N = 100000;           // 插入元素数量
    SqList *perfList = createSqList(16);
    if (!perfList) {
        printf("创建失败\n");
        return 1;
    }

    // 测试尾部插入（均摊 O(1)）
    clock_t start = clock();
    for (int i = 0; i < N; i++) {
        insertSqListElem(perfList, perfList->size, i);  // 尾部插入
    }
    clock_t end = clock();
    double tail_insert_time = (double)(end - start) / CLOCKS_PER_SEC;
    printf("尾部插入 %d 个元素耗时: %.3f 秒\n", N, tail_insert_time);

    // 测试头部插入（O(n)）
    start = clock();
    for (int i = 0; i < N / 100; i++) {   // 减少次数避免耗时过长
        insertSqListElem(perfList, 0, -i);
    }
    end = clock();
    double head_insert_time = (double)(end - start) / CLOCKS_PER_SEC;
    printf("头部插入 %d 个元素耗时: %.3f 秒\n", N / 100, head_insert_time);

    // 测试按值查找（O(n)）
    start = clock();
    for (int i = 0; i < N; i++) {
        size_t pos;
        getSqListByData(&pos, perfList, i);   // 查找每个元素
    }
    end = clock();
    double search_time = (double)(end - start) / CLOCKS_PER_SEC;
    printf("按值查找 %d 个元素耗时: %.3f 秒\n", N, search_time);

    // 测试按索引查找（O(1)）
    start = clock();
    for (int i = 0; i < N; i++) {
        int val;
        getSqListByIndex(&val, perfList, i);
    }
    end = clock();
    double index_time = (double)(end - start) / CLOCKS_PER_SEC;
    printf("按索引查找 %d 个元素耗时: %.3f 秒\n", N, index_time);

    destroySqList(perfList);
    return 0;
}
```
编译后测试：
```text
# bash: gcc SqList.c -o SqList && ./SqList
========== 正确性测试 ==========
size = 4, capacity = 4, elements: 10 15 20 30 
size = 3, capacity = 4, elements: 10 20 30 
索引2的元素 = 30
元素20的位置 = 1
顺序表内容: 
sqList[0]=10
sqList[1]=20
sqList[2]=30


========== 性能测试 ==========
尾部插入 100000 个元素耗时: 0.001 秒
头部插入 1000 个元素耗时: 0.005 秒
按值查找 100000 个元素耗时: 4.515 秒
按索引查找 100000 个元素耗时: 0.000 秒

```
可以看到：顺序表按索引查找元素速度极快，因为是直接访问连续内存块[^first]。而按值查找就慢得多，因为需要遍历整个表来查找需要的元素。

头部插入元素的性能低于尾部插入元素的性能，因为头部插入元素需要移动整个顺序表，而尾部插入元素只需插入元素，如有必要再去扩充顺序表大小。

## 小结

这一幕，我们了解了最基本的数据结构——顺序表的结构、类型，以及其实现的特性，并了解了顺序表的优势以及劣势。

下一幕，我们将了解更加灵活，但时间复杂度更高的线性表——链表。

[^first]: “物理相邻的存储单元”指的是在当前程序的虚拟内存中相邻，并非表示实际上物理内存中也相邻。具体的，参见操作系统部分的内存管理篇。（施工中）