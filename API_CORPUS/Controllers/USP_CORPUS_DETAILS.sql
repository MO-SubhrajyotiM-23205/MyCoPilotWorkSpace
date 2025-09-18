CREATE procedure [dbo].[USP_CORPUS_DETAILS]  
@CorpusType Varchar(25),  
@Amount numeric(18,0),  
@DepositionMode Varchar(25),  
@ChequeNo numeric(18,0),  
@CMSChequePath Varchar(250),  
@UTRNo Varchar(50),  
@UTRPath Varchar(250),  
@SplitOption Varchar(10),  
@SplitPath Varchar(250),  
@WaiverOption Varchar(10),  
@WaiverPath Varchar(250),  
@UserId numeric(18,0),  
@ClientCode Varchar(50),  
@CashVisaCopy Varchar(300)=null,  
@CashImmigrationCopy Varchar(300) =null 
AS  
BEGIN  
  
 DECLARE @SecondHolderName AS VARCHAR(500)  
 DECLARE @ThirdHolderName AS VARCHAR(500)  
 DECLARE @DPID AS VARCHAR(20)  
  
 SELECT @SecondHolderName = SecondHolderName , @ThirdHolderName = ThirdHolderName,@DPID=DPID FROM VW_REDEMPTION_PAC_ACCOPENING WHERE CLIENT_CODE = @ClientCode  
   
 Insert into TBL_CORPUS_DETAILS  
 (  
  CORPUS_TYPE,AMOUNT,DEPOSITION_MODE,CHEQUE_NO,CMS_CHEQUE_PATH,UTR_NO,UTR_PROOF_PATH,  
  SPLIT_OPTION,SPLIT_PROOF_PATH,WAIVER_OPTION,WAIVER_PATH,CREATED_BY,CREATED_DATE,ClientCode  
  ,CashVisaCopy,CashImmigrationCopy,SecondHolderName,ThirdHolderName,DPID  
 )  
 Values  
 (  
  @CorpusType,@Amount,@DepositionMode,@ChequeNo,@CMSChequePath,@UTRNo,@UTRPath,  
  @SplitOption,@SplitPath,@WaiverOption,@WaiverPath,@UserId,Getdate(),@ClientCode  
  ,@CashVisaCopy,@CashImmigrationCopy,@SecondHolderName,@ThirdHolderName,@DPID  
 )  
   
 Select @@Identity  
   
END  
  
  