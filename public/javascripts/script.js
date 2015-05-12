var App = function() {
    var b = "",
        Q = !1,
        t = !1,
        f = !1,
        n = !1,
        s = [],
        k = function() {
            for (var z in s) {
                var q = s[z];
                q.call()
            }
        },
        i = function() {
            f = $("#sidebar").hasClass("mini-menu"), n = $("#header").hasClass("navbar-fixed-top")
        },
        ad = function() {
            var B, q = $("#content"),
                F = $("#sidebar"),
                z = $("body");
            B = z.hasClass("sidebar-fixed") ? $(window).height() - $("#header").height() + 1 : F.height() + 20, B >= q.height() && q.attr("style", "min-height:" + B + "px !important")
        },
        u = function() {
            jQuery(".sidebar-menu .has-sub > a").click(function() {
                var B = jQuery(".has-sub.open", $(".sidebar-menu"));
                B.removeClass("open"), jQuery(".arrow", B).removeClass("open"), jQuery(".sub", B).slideUp(200);
                var q = $(this),
                    F = -200,
                    z = 200,
                    G = jQuery(this).next();
                G.is(":visible") ? (jQuery(".arrow", jQuery(this)).removeClass("open"), jQuery(this).parent().removeClass("open"), G.slideUp(z, function() {
                    0 == $("#sidebar").hasClass("sidebar-fixed") && App.scrollTo(q, F), ad()
                })) : (jQuery(".arrow", jQuery(this)).addClass("open"), jQuery(this).parent().addClass("open"), G.slideDown(z, function() {
                    0 == $("#sidebar").hasClass("sidebar-fixed") && App.scrollTo(q, F), ad()
                }))
            }), jQuery(".sidebar-menu .has-sub .sub .has-sub-sub > a").click(function() {
                var z = jQuery(".has-sub-sub.open", $(".sidebar-menu"));
                z.removeClass("open"), jQuery(".arrow", z).removeClass("open"), jQuery(".sub", z).slideUp(200);
                var q = jQuery(this).next();
                q.is(":visible") ? (jQuery(".arrow", jQuery(this)).removeClass("open"), jQuery(this).parent().removeClass("open"), q.slideUp(200)) : (jQuery(".arrow", jQuery(this)).addClass("open"), jQuery(this).parent().addClass("open"), q.slideDown(200))
            })
        },
        a = function() {
            var z = $(window).width();
            if (768 > z) {
                t = !0, jQuery("#main-content").addClass("margin-left-0")
            } else {
                t = !1, jQuery("#main-content").removeClass("margin-left-0");
                var q = $(".sidebar");
                1 === q.parent(".slimScrollDiv").size() && (q.slimScroll({
                    destroy: !0
                }), q.removeAttr("style"), $("#sidebar").removeAttr("style"))
            }
        },
        m = function() {
            jQuery(".sidebar-collapse").click(function() {
                if (t && !f) {
                    Q ? (jQuery("body").removeClass("slidebar"), jQuery(".sidebar").removeClass("sidebar-fixed"), n && (jQuery("#header").addClass("navbar-fixed-top"), jQuery("#main-content").addClass("margin-top-100")), Q = !1) : (jQuery("body").addClass("slidebar"), jQuery(".sidebar").addClass("sidebar-fixed"), n && (jQuery("#header").removeClass("navbar-fixed-top"), jQuery("#main-content").removeClass("margin-top-100")), Q = !0, o())
                } else {
                    var q = document.getElementById("sidebar-collapse").querySelector('[class*="fa-"]'),
                        z = q.getAttribute("data-icon1"),
                        B = q.getAttribute("data-icon2");
                    Q ? (jQuery(".navbar-brand").removeClass("mini-menu"), jQuery("#sidebar").removeClass("mini-menu"), jQuery("#main-content").removeClass("margin-left-50"), jQuery(".sidebar-collapse i").removeClass(B), jQuery(".sidebar-collapse i").addClass(z), jQuery(".search").attr("placeholder", "Search"), Q = !1) : (jQuery(".navbar-brand").addClass("mini-menu"), jQuery("#sidebar").addClass("mini-menu"), jQuery("#main-content").addClass("margin-left-50"), jQuery(".sidebar-collapse i").removeClass(z), jQuery(".sidebar-collapse i").addClass(B), jQuery(".search").attr("placeholder", ""), Q = !0), $("#main-content").on("resize", function(F) {
                        F.stopPropagation()
                    })
                }
            })
        };
    jQuery(window).resize(function() {
        setTimeout(function() {
            i(), ad(), a(), h(), k()
        }, 50)
    });
    var e = function() {
            $(".tip").tooltip(), $(".tip-bottom").tooltip({
                placement: "bottom"
            }), $(".tip-left").tooltip({
                placement: "left"
            }), $(".tip-right").tooltip({
                placement: "right"
            }), $(".tip-focus").tooltip({
                trigger: "focus"
            })
        },
        c = function() {
            jQuery(".box .tools .collapse, .box .tools .expand").click(function() {
                var z = jQuery(this).parents(".box").children(".box-body");
                if (jQuery(this).hasClass("collapse")) {
                    jQuery(this).removeClass("collapse").addClass("expand");
                    var q = jQuery(this).children(".fa-chevron-up");
                    q.removeClass("fa-chevron-up").addClass("fa-chevron-down"), z.slideUp(200)
                } else {
                    jQuery(this).removeClass("expand").addClass("collapse");
                    var q = jQuery(this).children(".fa-chevron-down");
                    q.removeClass("fa-chevron-down").addClass("fa-chevron-up"), z.slideDown(200)
                }
            }), jQuery(".box .tools a.remove").click(function() {
                var q = jQuery(this).parents(".box");
                q.next().hasClass("box") || q.prev().hasClass("box") ? jQuery(this).parents(".box").remove() : jQuery(this).parents(".box").parent().remove()
            }), jQuery(".box .tools a.reload").click(function() {
                var q = jQuery(this).parents(".box");
                App.blockUI(q), window.setTimeout(function() {
                    App.unblockUI(q)
                }, 1000)
            })
        },
        ac = function() {
            jQuery().slimScroll && $(".scroller").each(function() {
                $(this).slimScroll({
                    size: "7px",
                    color: "#a1b2bd",
                    height: $(this).attr("data-height"),
                    alwaysVisible: "1" == $(this).attr("data-always-visible") ? !0 : !1,
                    railVisible: "1" == $(this).attr("data-rail-visible") ? !0 : !1,
                    railOpacity: 0.1,
                    disableFadeOut: !0
                })
            })
        },
        j = function() {
            jQuery(document).ready(function() {
                var z = moment().format("YYYY-MM-DD HH:mm"),
                    q = moment().subtract("days", 1).format("MMM D, YYYY");
                $("#curr-time").html(z), $("#curr-time").attr("title", z), $("#curr-time").attr("data-original-title", z), $("#yesterday").html(q), $("#yesterday").attr("title", q), $("#yesterday").attr("data-original-title", q), jQuery("abbr.timeago").timeago()
            })
        },
        C = function() {
            var z = function(B) {
                $(B).each(function() {
                    var F = $($($(this).attr("href"))),
                        G = $(this).parent().parent();
                    G.height() > F.height() && F.css("min-height", G.height())
                })
            };
            if ($("body").on("click", '.nav.nav-tabs.tabs-left a[data-toggle="tab"], .nav.nav-tabs.tabs-right a[data-toggle="tab"]', function() {
                    z($(this))
                }), z('.nav.nav-tabs.tabs-left > li.active > a[data-toggle="tab"], .nav.nav-tabs.tabs-right > li.active > a[data-toggle="tab"]'), location.hash) {
                var q = location.hash.substr(1);
                $('a[href="#' + q + '"]').click()
            }
        },
        v = function() {
            $("[data-toggle='popover']").popover()
        },
        g = function() {
            $("[data-toggle='popover']").popover(), jQuery(document).bind("keyup", function(q) {
                39 == q.which ? jQuery("a.carousel-control.right").trigger("click") : 37 == q.which && jQuery("a.carousel-control.left").trigger("click")
            }), $("#list-toggle .list-group a").click(function() {
                $("#list-toggle .list-group > a.active").removeClass("active"), $(this).addClass("active")
            })
        },
        r = function() {
            $("[data-toggle='popover']").popover(), $(".box-container").sortable({
                connectWith: ".box-container",
                items: "> .box",
                opacity: 0.8,
                revert: !0,
                forceHelperSize: !0,
                placeholder: "box-placeholder",
                forcePlaceholderSize: !0,
                tolerance: "pointer"
            })
        },
        p = function() {
            $(".footer-tools").on("click", ".go-top", function(q) {
                App.scrollTo(), q.preventDefault()
            })
        },
        h = function() {
            t && n && $("#main-content").addClass("margin-top-100"), !t && n && $("#main-content").removeClass("margin-top-100").addClass("margin-top-50")
        },
        x = function() {
            $(".js_update").on("click", function() {
                f.update(100 * Math.random()), n.update(100 * Math.random()), s.update(100 * Math.random()), t()
            })
        },
        y = function() {
            $("abbr.timeago").timeago();
            $("#datatable1").dataTable({
                sPaginationType: "bs_full",
                "aaSorting": [],
                sDom: "<'row'<'dataTables_header clearfix'<'col-md-4'l><'col-md-8'Tf>r>>t<'row'<'dataTables_footer clearfix'<'col-md-6'i><'col-md-6'p>>>",
                oTableTools: {
                    aButtons: ["copy", "print", "csv", "xls", "pdf"],
                    sSwfPath: "/swf/copy_csv_xls_pdf.swf"
                }
            }), ($(".datatable.userdata").length) ? ($(".datatable.userdata").dataTable().fnSort([
                [1, "asc"]
            ])) : null, $(".datatable").each(function() {
                var z = $(this),
                    B = z.closest(".dataTables_wrapper").find("div[id$=_filter] input");
                B.attr("placeholder", "Search"), B.addClass("form-control input-sm");
                var q = z.closest(".dataTables_wrapper").find("div[id$=_length] select");
                q.addClass("form-control input-sm")
            })
        },
        w = function() {
            var q = function(z) {
                $("#skin-switcher").attr("href", "/stylesheets/themes/" + z + ".css"), $.cookie("skin_color", z)
            };
            $("ul.skins > li a").click(function() {
                var z = $(this).data("skin");
                q(z)
            }), $.cookie("skin_color") && q($.cookie("skin_color"))
        },
        l = function() {
            $("textarea.autosize").autosize()
        };
    return {
        init: function() {
            App.isPage("index") && (bb(), x(), cb()), App.isPage("widgets_box") && r(), App.isPage("elements") && (A(), D(), E(), j()), App.isPage("login") && v(), App.isPage("login_bg") && (v(), hb()), App.isPage("faq") && g(), App.isPage("user_data") && y(), App.isPage("feedback") && (l(), e()), i(), u(), m(), ad(), a(), e(), c(), ac(), C(), p(), h(), w()
        },
        setPage: function(q) {
            b = q
        },
        isPage: function(q) {
            return b == q ? !0 : !1
        },
        addResponsiveFunction: function(q) {
            s.push(q)
        },
        scrollTo: function(z, q) {
            pos = z && z.size() > 0 ? z.offset().top : 0, jQuery("html,body").animate({
                scrollTop: pos + (q ? q : 0)
            }, "slow")
        },
        scrollTop: function() {
            App.scrollTo()
        },
        blockUI: function(q) {
            lastBlockedUI = q, jQuery(q).block({
                message: '<img src="/images/loader.gif" align="absmiddle">',
                css: {
                    border: "none",
                    padding: "2px",
                    backgroundColor: "none"
                },
                overlayCSS: {
                    backgroundColor: "#000",
                    opacity: 0.05,
                    cursor: "wait"
                }
            })
        },
        unblockUI: function(q) {
            jQuery(q).unblock({
                onUnblock: function() {
                    jQuery(q).removeAttr("style")
                }
            })
        }
    }
}();
! function(b) {
    b.fn.admin_tree = function(a) {
        var d = {
            "open-icon": "fa fa-folder-open",
            "close-icon": "fa fa-folder",
            selectable: !0,
            "selected-icon": "fa fa-check",
            "unselected-icon": "tree-dot"
        };
        return d = b.extend({}, d, a), this.each(function() {
            var c = b(this);
            c.html('<div class = "tree-folder" style="display:none;">               <div class="tree-folder-header">                    <i class="' + d["close-icon"] + '"></i>                 <div class="tree-folder-name"></div>                </div>              <div class="tree-folder-content"></div>             <div class="tree-loader" style="display:none"></div>            </div>          <div class="tree-item" style="display:none;">               ' + (null == d["unselected-icon"] ? "" : '<i class="' + d["unselected-icon"] + '"></i>') + '                <div class="tree-item-name"></div>          </div>'), c.addClass(1 == d.selectable ? "tree-selectable" : "tree-unselectable"), c.tree(d)
        }), this
    }
}(window.jQuery),
function() {
    this.Theme = function() {
        function b() {}
        return b.colors = {
            white: "#FFFFFF",
            primary: "#5E87B0",
            red: "#D9534F",
            green: "#A8BC7B",
            blue: "#70AFC4",
            orange: "#F0AD4E",
            yellow: "#FCD76A",
            gray: "#6B787F",
            lightBlue: "#D4E5DE",
            purple: "#A696CE",
            pink: "#DB5E8C",
            dark_orange: "#F38630"
        }, b
    }()
}(window.jQuery);
