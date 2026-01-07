<i18n lang="json">
{
  "en": {
    "pageTitle": "News",
    "title": "News"
  },
  "id": {
    "pageTitle": "Berita",
    "title": "Berita"
  }
}
</i18n>
<script lang="ts" setup>
const { t } = useI18n({
  useScope: "local",
});

const page = ref(1);
const limit = ref(10);
const totalItem = ref(100);
</script>
<template>
  <WidgetsHeroSlider :title="t('pageTitle')" image="/images/bg-feb.webp" />

  <section id="down-section">
    <div class="container">
      <div class="row">
        <div class="col-12 px-0">
          <ul
            class="blog-classic blog-wrapper grid-loading grid grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-double-extra-large"
            data-anime='{ "el": "childs", "translateY": [50, 0], "opacity": [0,1], "duration": 1200, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
          >
            <li class="grid-sizer"></li>
            <!-- start blog item -->
            <li class="grid-item" v-for="value in 11">
              <ModulesNewsCard
                :date="`2025-10-${value}`"
                :desc="'Desc: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui, quod!'"
                :news-type="'Achievement News'"
                :title="'Congrats!!'"
                :image="'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D'"
              />
            </li>
            <!-- end blog item -->
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-12 mt-2 d-flex justify-content-center">
          <WidgetsPagination
            :current-page="page"
            :per-page="limit"
            :total="totalItem"
          />
        </div>
      </div>
    </div>
  </section>
</template>
