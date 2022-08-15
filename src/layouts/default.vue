<template>
  <div class="px-4 text-center text-gray-700 dark:text-gray-200" h-full w-full>
    <Header />
    <Suspense>
      <RouterView />
    </Suspense>
    <Footer />
  </div>
</template>
