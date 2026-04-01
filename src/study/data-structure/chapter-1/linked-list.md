---
title: 第二幕：链表
icon: material-symbols:power-outline
order: 1
category:
  - 数据结构
tag:
  - C/C++
  - 线性表
  - 链表
---

## 序

线性表的第二种物理实现——链表，放弃了物理相邻的奢求，转而用指针串联起离散的节点。这种“用空间换灵活性”的设计，让插入与删除不再受限于数据移动，却也付出了随机访问的代价。理解链表，就是理解指针在数据结构中的核心角色，也是我们迈向更复杂结构（如树、图）的重要阶梯，同时也常作为 malloc 等内存管理机制的底层实现，构筑起高效的内存分配机制。

这一幕，我们将一探链表的本质，弄清楚这个简洁的数据结构之下，指针是如何作为链子，链接起一个个离散的节点的。

## 链表的概念与结构

### 链表的定义与结构

链表是由多个离散的节点由指针串联而成的数据结构。与上一幕我们实现的顺序表不同，链表通常在内存中并不连续存储。

一个链表节点通常包含数据域与指针域。以单链表为例，它可以用C语言表示如下：
```C
typedef struct Node {
    int data;
    struct Node *next;
} Node;
```

### 链表的类型

按链接方式区分，链表可以分为单链表、双链表以及循环链表。其中双链表有prev与next两个节点，分别指向该节点的前一个节点与后一个节点；循环链表的首尾用指针相连。

同样地，链表也需要 **CRUD**[^first] 操作。一个基本的链表需要实现以下函数：
  - 创建链表
  - 增加节点
  - 修改节点内容
  - 删除节点
  - 查看节点内容
  - 销毁链表

## 链表的实现

接下来，我们将为前面定义的单链表实现上述操作。

### 创建链表
```C
Node *createNode() {
  Node *node = (Node *)malloc(sizeof(Node));
  if (node == NULL)
    return NULL;

  node->data = 0;
  node->next = NULL;
  return node;
}

```

### 增加节点

```C
bool addNode(Node **head, int data, size_t idx) {
  if (head == NULL)
    return false;

  Node *new_node = createNode();
  if (new_node == NULL)
    return false;

  new_node->data = data;

  Node *tmp = *head;
  size_t index = 0;

  if (idx == 0) {
    new_node->next = *head;
    *head = new_node;
    return true;
  }

  while (tmp != NULL && index != idx - 1) {
    tmp = tmp->next;
    index++;
  }

  if (tmp == NULL)
    return false;

  new_node->next = tmp->next;
  tmp->next = new_node;

  return true;
}

```
### 修改节点内容
```C
bool modifyNode(Node *node, int data, size_t idx) {
  if (node == NULL)
    return false;

  Node *tmp = node;
  size_t index = 0;

  while (tmp != NULL && index != idx) {
    tmp = tmp->next;
    index++;
  }

  if (tmp == NULL)
    return false;
  tmp->data = data;

  return true;
}
```



[^first]: 增删改查