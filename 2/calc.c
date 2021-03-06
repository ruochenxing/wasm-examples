#ifndef EM_PORT_API
#if defined(__EMSCRIPTEN__)
#include <emscripten.h>
#if defined(__cplusplus)
#define EM_PORT_API(rettype) extern "C" rettype EMSCRIPTEN_KEEPALIVE
#else
#define EM_PORT_API(rettype) rettype EMSCRIPTEN_KEEPALIVE
#endif
#else
#if defined(__cplusplus)
#define EM_PORT_API(rettype) extern "C" rettype
#else
#define EM_PORT_API(rettype) rettype
#endif
#endif
#endif

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "./cJSON.h"

EM_PORT_API(void *)
_malloc(size_t size) {
  void *buf = malloc(size);
  return buf;
}

EM_PORT_API(const char *)
count_phone_book3(char *PhoneBook, char *result) {
  cJSON *from = cJSON_Parse(PhoneBook);
  cJSON *res = cJSON_Parse(result);
  if (!cJSON_IsObject(res)) {
    res = cJSON_CreateObject();
  }
  int count = 0;
  int num = 0;
  if (cJSON_IsObject(from)) {
    cJSON *contactList = cJSON_GetObjectItem(from, "contactList");
    if (cJSON_IsArray(contactList)) {
      count = cJSON_GetArraySize(contactList);
      for (int i = 0; i < count; i++) {
        cJSON *item = cJSON_GetArrayItem(contactList, i);
        if (cJSON_IsObject(item)) {
          cJSON *phoneNumberList = cJSON_GetObjectItem(item, "phoneNumberList");
          if (cJSON_IsArray(phoneNumberList)) {
            num += cJSON_GetArraySize(phoneNumberList);
          }
        }
      }
    }
  }
  cJSON_AddNumberToObject(res, "contacts_count", count);
  cJSON_AddNumberToObject(res, "contact_nums", num);
  char *str = cJSON_Print(res);
  cJSON_Delete(from);
  cJSON_Delete(res);

  // char* mem = (char*)malloc(1024 * 1024 * 256); 
  // char* json_string ="{\"status\":\"1\",\"info\":\"OK\",\"infocode\":\"10000\"}";
  // int len = strlen(json_string);
  // for (int i = 0; i < len; ++i)
  //   mem[i] = json_string[i];
  // return mem;
  return str;  
}

char* EMSCRIPTEN_KEEPALIVE outName(char *n){    
 char xhName[] = "xuanhun";   
 strcat(n, xhName);   
 return n;
}