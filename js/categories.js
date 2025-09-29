(function () {
  const categories = {
    "Google Apps": [
      { label: "Settings", icon: "settings", href: "intent://com.android.settings/#Intent;scheme=android-app;end", color: "#00aaff" },
      { label: "Screen SmartLock", icon: "lock", href: "intent://com.google.android.gms/#Intent;scheme=promote_smartlock_scheme;end", color: "#9c27b0" },
      { label: "Google Assistant", icon: "mic", href: "intent://com.google.android.apps.googleassistant/#Intent;scheme=android-app;end", color: "#ff9800" },
      { label: "Gmail", icon: "mail", href: "intent://com.google.android.gm/#Intent;scheme=android-app;end", color: "#e53935" },
      { label: "YouTube", icon: "ondemand_video", href: "intent://com.google.android.youtube/#Intent;scheme=android-app;end", color: "#f44336" },
      { label: "Google Map", icon: "map", href: "intent://com.google.android.apps.maps/#Intent;scheme=android-app;end", color: "#4caf50" },
      { label: "Google Chrome", icon: "language", href: "intent://com.android.chrome/#Intent;scheme=android-app;end", color: "#2196f3" },
      { label: "Google Play Store", icon: "shop", href: "intent://com.android.vending/#Intent;scheme=android-app;end", color: "#00c853" }
    ],
    "Samsung Apps": [
      { label: "Samsung Dial Pad", icon: "dialpad", href: "intent://com.samsung.android.dialer/#Intent;scheme=android-app;end", color: "#4caf50" },
      { label: "Samsung Calculator", icon: "calculate", href: "intent://com.sec.android.app.popupcalculator/#Intent;scheme=android-app;end", color: "#ffeb3b" },
      { label: "Samsung Smart Switch", icon: "sync", href: "intent://com.sec.android.easyMover/#Intent;scheme=android-app;end", color: "#03a9f4" },
      { label: "Samsung Home Launcher", icon: "home", href: "intent://com.sec.android.app.launcher/#Intent;scheme=android-app;end", color: "#00bcd4" },
      { label: "Samsung Secure Folder", icon: "lock", href: "intent://com.samsung.knox.securefolder/#Intent;scheme=android-app;end", color: "#9c27b0" },
      { label: "Samsung File Manager", icon: "folder", href: "intent://com.sec.android.app.myfiles/#Intent;scheme=android-app;end", color: "#ff9800" },
      { label: "Samsung Galaxy Store", icon: "store", href: "https://www.samsung.com/fr/apps/galaxy-store/", color: "#ec407a" },
      { label: "Samsung S9 Launcher", icon: "apps", href: "https://galaxystore.samsung.com/detail/com.s9launcher.dir.launcher", color: "#2196f3" },
      { label: "Samsung Touch ID", icon: "fingerprint", href: "intent://com.android.settings/com.samsung.android.settings.biometrics.fingerprint.FingerprintEntry/#Intent;scheme=android-app;end", color: "#00acc1" },
      { label: "Samsung Login Account", icon: "person", href: "intent://com.google.android.gsf.login.LoginActivity/#Intent;scheme=android-app;end", color: "#8bc34a" }
    ],
    "Infinix Apps": [
      { label: "Infinix AI Gallery", icon: "photo_library", href: "intent://com.gallery20/#Intent;scheme=android-app;end", color: "#7b1fa2" },
      { label: "Infinix Phone Master", icon: "security", href: "intent://com.transsion.phonemaster/#Intent;scheme=android-app;end", color: "#ff5722" },
      { label: "Infinix File Manager", icon: "folder", href: "intent://com.transsion.filemanagerx/#Intent;scheme=android-app;end", color: "#ffc107" },
      { label: "Infinix XArena", icon: "sports_esports", href: "intent://com.transsion.gamespace.app/#Intent;scheme=android-app;end", color: "#4caf50" },
      { label: "Infinix Camera", icon: "photo_camera", href: "intent://com.transsion.camera/#Intent;scheme=android-app;end", color: "#00bcd4" },
      { label: "Infinix Smart Panel", icon: "widgets", href: "intent://com.transsion.smartpanel/#Intent;scheme=android-app;end", color: "#9c27b0" },
      { label: "Palm Store", icon: "storefront", href: "intent://com.transsnet.store/#Intent;scheme=android-app;end", color: "#ff9800" }
    ],
    "Tools": [
      { label: "Dial Pad", icon: "dialpad", href: "tel:", color: "#4caf50" },
      { label: "ADB Settings", icon: "usb", href: "intent://com.sec.android.app.modemui.activities.USB.settings/#Intent;scheme=android-app;end", color: "#8bc34a" },
      { label: "USB Settings", icon: "usb", href: "intent://com.sec.android.app.servicemodeapp/#Intent;scheme=promote_USBSettings_scheme;end", color: "#00bcd4" },
      { label: "Smart Launcher", icon: "apps", href: "intent://ginlemon.flowerfree/#Intent;scheme=android-app;end", color: "#9c27b0" },
      { label: "Activity Launcher", icon: "launch", href: "intent://de.szalkowski.activitylauncher/#Intent;scheme=android-app;end", color: "#ff5722" },
      { label: "OPPO Clone Phone", icon: "phone_android", href: "intent://com.coloros.backuprestore/#Intent;scheme=android-app;end", color: "#03a9f4" },
      { label: "Vivo Camera", icon: "photo_camera", href: "intent://com.android.camera/#Intent;scheme=android-app;end", color: "#e91e63" }
    ],
    "Downloads": [
      { label: "Activity Launcher App", icon: "download", href: "https://www.mediafire.com/file/nn9i1b8xg99vds5/activitylauncher.apk/file", color: "#009688" },
      { label: "FRP Bypass App", icon: "download", href: "https://www.mediafire.com/file/tdjoz619628ehai/FRP_Bypass.apk/file", color: "#4caf50" },
      { label: "Android 8-9-10 App", icon: "android", href: "https://www.mediafire.com/file/mhhctzb8tws676r/Android_8-9-10_GAM.apk/file", color: "#2196f3" },
      { label: "Android 5 App", icon: "android", href: "https://www.mediafire.com/file/5dhzu1dqkg84r7m/Android_5_GAM.apk/file", color: "#795548" },
      { label: "Android 6 App", icon: "android", href: "https://www.mediafire.com/file/dhbjnrnbuygf4o3/Android_6_GAM.apk/file", color: "#9c27b0" },
      { label: "Android 7 App", icon: "android", href: "https://www.mediafire.com/file/uv5luqcu7hg5jbv/FRP_Android_7.apk/file", color: "#f44336" },
      { label: "Package Disabler Pro App", icon: "block", href: "https://www.mediafire.com/file/soxblin6pajfl7b/Package_Disabler_Pro.apk/file", color: "#ff9800" },
      { label: "Package Disabler Pro 13.5 App", icon: "block", href: "https://www.mediafire.com/file/5r9iwzjyp1vi1ca/Package_Disabler_Pro_13.5.apk/file", color: "#ff5722" },
      { label: "Smart Launcher App", icon: "apps", href: "https://www.mediafire.com/file/apk1qe8q5zm2o5f/Smart_Launcher.apk/file", color: "#3f51b5" },
      { label: "WiFi-Rental App", icon: "wifi", href: "https://www.mediafire.com/file/0jgb6a1xmy5itkm/WiFi-Rental.apk/file", color: "#00bcd4" }
    ]
  };

  function renderCategories(data) {
    const container = document.getElementById('categories-container');
    if (!container) return;
    container.innerHTML = '';

    Object.entries(data).forEach(([catName, apps]) => {
      const catDiv = document.createElement('section');
      catDiv.className = 'category';

      const title = document.createElement('h2');
      title.textContent = catName;
      catDiv.appendChild(title);

      const grid = document.createElement('div');
      grid.className = 'grid';

      apps.forEach(app => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'card';
        card.addEventListener('click', () => {
          if (app.href) window.location.href = app.href;
        });

        const icon = document.createElement('span');
        icon.className = 'material-icons';
        icon.textContent = app.icon;
        icon.style.color = app.color || '';

        const label = document.createElement('div');
        label.className = 'label';
        label.textContent = app.label;

        card.appendChild(icon);
        card.appendChild(label);
        grid.appendChild(card);
      });

      catDiv.appendChild(grid);
      container.appendChild(catDiv);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderCategories(categories);
  });
})();
