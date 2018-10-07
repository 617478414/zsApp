/*
 * NodeName=>节点名
 * i=>标志位
 */
function CreatNodeLeft(NodeName,i){
    html.push("<a class='mui-control-item' href='#content"+ i +"' >"+NodeName+"</a>");
    return html;
}
/*
 * CardType=>卡片类型
 * UploadTime=》提交时间
 * CheMan=》审批人
 * CheTim=》审批时间
 * CheEls=》审批备注
 * CheRes=》审批结果
 */
function CreatNodeRight(CardType,UploadTime,CheMan,CheTim,CheEls,CheRes,NodeName,i){
    //判断是流程
    var CssType = '';
//  switch(CardType){
    switch(CheRes){
        case '待签批':
            CssType = 'cir-waitSign'
        break;
        case '驳回':
            CssType = 'cir-reject'
        break;
        case '逾期':
            CssType = 'cir-outdate'
        break;
        case '已签批':
            CssType = 'cir-pass'
        break;
        default:break;
    }
    
    var htmlRight = ''
    htmlRight+="<div id='content"+ i + "' class='mui-control-content'><div class='mui-table-view'>";
    htmlRight+="<li class='mui-table-view-cell'>"+NodeName+"</li>";
    htmlRight+="<div class='mui-card'><div class='mui-card-header "+CssType+"'>提交时间："+UploadTime+"</div><div class='mui-card-content'><div class='mui-card-content-inner'>";
    htmlRight+="<p><span>审批人：</span></p><p><span class='formMes'>"+CheMan+"</span></p><hr/>"
    htmlRight+="<p><span>审批时间：</span></p><p><span class='formMes'>"+CheTim+"</span></p><hr/>";
    htmlRight+="<p><span>备注：</span></p><p><span class='formMes'>"+CheEls+"</span></p></div></div>"
    htmlRight+="<div class='mui-card-footer'><span class='formMes'>审批结果:"+CheRes+"</span></div></div>"
    htmlRight+='</div></div>';
    return htmlRight
}