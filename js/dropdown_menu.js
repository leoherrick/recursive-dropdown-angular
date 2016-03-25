var DropdownController = function ($scope, menuData) {
  $scope.menuItems = menuData;
};

var DropdownMenuList = function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      list: '='
    },
    template: 
      "<ul class='dropdown-menu__list'>" + 
        "<dropdown-menu-item ng-repeat='item in list' item='item'></dropdown-menu-item>" + 
      "</ul>"
  }
};

var DropdownMenuItem = function ($compile) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      item: '='
    },
    template: 
      "<li class='dropdown-menu__item' ng-click='sayHi($event);'>" +
        "<span class='dropdown-menu__title'>{{item.title}}</span>" + 
      "</li>",
    link: function (scope, element) {
      if (scope.item.submenu) {
        element.append("<dropdown-menu-list list='item.submenu'></dropdown-menu-list>");
        $compile(element.contents())(scope);
      }

      scope.sayHi = function ($event) {
        alert(scope.item.title);
        $event.stopPropagation();
      }
    }
  }
}

var MenuData = [
  {
    'title': 'Item 1',
    'submenu': null,
  },
  {
    'title': 'Item 2',
    'submenu': null,
  },
  {
    'title': 'Item 3',
    'submenu': [
      {
        'title': 'Sub 1',
        'submenu': null,
      },
      {
        'title': 'Sub 2',
        'submenu': null,
      },
      {
        'title': 'Sub 3',
        'submenu': [
          {
            'title': 'SubSub 1',
            'submenu': null,
          },
          {
            'title': 'SubSub 2',
            'submenu': null,
          },
          {
            'title': 'SubSub 3',
            'submenu': null,
          },
        ]
      }
    ]
  }
];

angular.module('Dropdown', [])
  .controller('Dropdown.Controller', DropdownController)
  .directive('dropdownMenuList', DropdownMenuList)
  .directive('dropdownMenuItem', DropdownMenuItem)
  .constant('menuData', MenuData)