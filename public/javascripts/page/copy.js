/**
 * Created with JetBrains WebStorm.
 * User: liangjun.zhong
 * Date: 13-10-19
 * Time: PM7:46
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function(){

    $('#new-activity-success-msg-content-href').zclip({
        path: "/javascripts/ZeroClipboard.swf",
        copy: function(){
            return $('#new-activity-success-msg-content-href').text();
        },
        afterCopy: function(){
            alert('get it');
        }
    });

});