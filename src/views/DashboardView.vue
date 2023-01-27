<template>
  <section>
   <div class="container is-fluid">
      <div class="columns pt-6 dashboard">
        <div class="column is-one-fifth dashboard__menu">
          <aside class="menu">
            <div class="hero-head">
              <div class="header">
                <h1 class="header__title">Pawl <span>UI</span></h1>
              </div>
            </div>
            <p class="menu-label">
              General
            </p>
            <ul class="menu-list">
              <li><a class="is-active">Dashboard</a></li>
            </ul>
            <p class="menu-label">
              Administration
            </p>
            <ul class="menu-list">
              <li><a>Team Settings</a></li>
            </ul>
            <p class="menu-label">
              Actions
            </p>
            <ul class="menu-list">
              <li><a>Logout</a></li>
            </ul>
          </aside>
        </div>
        <div class="column dashboard__content">
          <router-view></router-view>
        </div>
      </div>
   </div>
  </section>
</template>
