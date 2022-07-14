import { isObject } from "@vueuse/core";

export function useDeepEqual(objOne:object,objTwo:object){
  console.log(objOne,objTwo);
  const keyOne:any[] = Object.keys(objOne);
  const keyTwo:any[] = Object.keys(objTwo);
  if(keyOne.length!==keyTwo.length){
    return
  }
  for(const k of keyOne){  
    const valOne = keyOne[k];
    const valTwo = keyTwo[k];
    const iso=isObject(valOne)&&isObject(valTwo)
    if(iso&&useDeepEqual(valOne,valTwo)||!iso&&valOne!==valTwo){
      return k
    }
  }
}
