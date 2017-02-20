(function() {

	try {

		var Resources = DCM.Resources = ROCK.createStatic(ROCK.createClass(function() {

			this.setCulture("en-GB");
			setResourceGroup("en-GB", {
				"L0001": "Your email address is not recognised - please do try again",
				"L0002": "Your password is incorrect - please do try again",
				"L0003": "Your account is currently disabled. Please contact customer services",
				"C0002": "You have exceeded your maximum number of charts - please close a chart in order to open a new chart.",
				"E0001": "Server error - generic response error",
				"U0002": "Your application is currently being processed.<br />If you have any enquires please email newaccounts@dcmcap.com",
				"C0001": "Server error - chart could not be loaded at this time",
				"U0002Heading": "Account application processing",
				"ERROR01": "Server error - Instruments library could not be loaded at this time",
				"ERROR02": "Server error - instrument could not be loaded at this time",
				"ERROR03": "Server error - no response",
				"ERROR04": "Server error - item could not be added to your portfolio at this time",
				"ERROR05": "Server error - item could not be added to your watchlist at this time",
				"ERROR06": "Server error - chart could not be closed at this time",
				"ERROR07": "Server error - order could not be cancelled at this time",
				"ERROR08": "Server error - position could not be closed at this time",
				"ERROR09": "Server error - alert could not be created at this time",
				"ERROR10": "Server error - note could not be created at this time",
				"ERROR11": "Server error - portfolio could not be created at this time",
				"ERROR12": "Server error - watchlist could not be created at this time",
				"ERROR13": "Server error - alert could not be deleted at this time",
				"ERROR14": "Server error - item could not be removed from your portfolio at this time",
				"ERROR15": "Server error - item could not be removed from your watchlist at this time",
				"ERROR16": "Server error - note could not be deleted at this time",
				"ERROR17": "Server error - order could not be deleted at this time",
				"ERROR18": "Server error - portfolio could not be deleted at this time",
				"ERROR19": "Server error - watchlist could not be deleted at this time",
				"ERROR20": "Server error - alert could not be edited at this time",
				"ERROR21": "Server error - note could not be edited at this time",
				"ERROR22": "Server error - order could not be edited at this time",
				"ERROR23": "Server error - position could not be edited at this time",
				"ERROR24": "Server error - registration form could not be created at this time",
				"ERROR25": "Server error - account details could not be loaded at this time",
				"ERROR26": "Server error - alerts could not be loaded at this time",
				"ERROR27": "Server error - chart could not be loaded at this time",
				"ERROR28": "Server error - account could not be created at this time",
				"ERROR29": "Server error - news item could not be loaded at this time",
				"ERROR30": "Server error - notes could not be loaded at this time",
				"ERROR31": "Server error - orders could not be loaded at this time",
				"ERROR32": "Server error - portfolio could not be loaded at this time",
				"ERROR33": "Server error - portfolios could not be loaded at this time",
				"ERROR34": "Server error - open positions could not be loaded at this time",
				"ERROR35": "Server error - a session could not be created at this time",
				"ERROR36": "Server error - settings could not be loaded at this time",
				"ERROR37": "Server error - modules could not be loaded at this time",
				"ERROR38": "Server error - account details could not be loaded at this time",
				"ERROR39": "Server error - watchlist could not be loaded at this time",
				"ERROR40": "Server error - watchlists could not be loaded",
				"ERROR41": "Server error - you could not be logged in at this time",
				"ERROR42": "Server error - account could not be created at this time",
				"ERROR43": "Server error - order could not be opened at this time",
				"ERROR44": "Server error - position could not be opened at this time",
				"ERROR45": "Server error - watchlist could not be renamed at this time",
				"ERROR46": "Server error - password could not be requested at this time",
				"ERROR47": "Server error - password could not be reset at this time",
				"ERROR48": "Server error - alert could not be marked as read at this time",
				"ERROR49": "Server error - settings could not be saved at this time",
				"ERROR50": "Server error - account could not be changed at this time",
				"Default": "XXX",
				"CloseLabel": "Close",
				"ContinueLabel": "Continue",
				"DefaultModuleHeading": "Module",
				"AccountOverviewPanelHeading": "Account Overview",
				"AlertsPanelHeading": "Alerts",
				"GlobalWatchlistPanelHeading": "Global Watchlist",
				"OpenPositionsPanelHeading": "Positions",
				"DealTicketPanelHeading": "Ticket",
				"NewsPanelHeading": "Live News",
				"PortfoliosPanelHeading": "Portfolios",
				"NotesPanelHeading": "Notes",
				"ClosedPositionsPanelHeading": "Closed Positions",
				"TradingWizardModuleHeading": "Trading Wizard",
				"OrdersPanelHeading": "Orders",
				"CloseModule": "Close",
				"ShowSentiball": "Show Sentiball",
				"HideSentiball": "Hide Sentiball",
				"ShowGraph": "Show graph",
				"ShowNews": "Show news",
				"ShowNotes": "Show notes",
				"ResizePanel": "Resize module",
				"ExpandModuleLabel": "Expand module",
				"CollapseModuleLabel": "Collapse module",
				// Unpin
				"WatchlistsModuleUnpin": "Watchlists - unpin from dashboard",
				"PortfoliosModuleUnpin": "Portfolios - unpin from dashboard",
				"NewsModuleUnpin": "News - unpin from dashboard",
				"NotesModuleUnpin": "Notes - unpin from dashboard",
				"AlertsModuleUnpin": "Alerts - unpin from dashboard",
				"OrdersModuleUnpin": "Orders - unpin from dashboard",
				// Pin
				"WatchlistsModulePin": "Watchlists - pin to dashboard",
				"PortfoliosModulePin": "Portfolios - pin to dashboard",
				"NewsModulePin": "News - pin to dashboard",
				"NotesModulePin": "Notes - pin to dashboard",
				"AlertsModulePin": "Alerts - pin to dashboard",
				"OrdersModulePin": "orders - pin to dashboard",
				
				"ModulesToolbarItem": "Module manager",
				"AccountToolbarItem": "My account",
				"FinderToolbarItem": "Finder",
				"BalanceToolbarItem": "Balance",
				"SettingsToolbarItem": "Settings",
				"LogoutToolbarItem": "Logout",
				"ForceOpenLabel": "Force-open",
				"StandardStop": "Standard stop",
				"GuaranteedStop": "Guaranteed stop",
				"TrailingStop": "Trailing-stop",
				"PointsLabel": "PTS.",
				"StopLabel": "Stop",
				"LimitLabel": "Limit",
				"SellLabel": "Sell",
				"BuyLabel": "Buy",
				"EmployedLabel": "Employed",
				"EmploymentLabel": "Employment",
				"SelfEmployedLabel": "Self-employed",
				"RetiredLabel": "Retired",
				"UnemployedLabel": "Unemployed",
				"InhreitanceLabel": "Inhreitance",
				"InvestmentLabel": "Investment",
				"FrequentlyLabel": "Frequently",
				"SometimesLabel": "Sometimes",
				"NeverLabel": "Never",
				"StatementsByPostLabel": "I would prefer to recieve my statements by post. Your statements will be sent by email as standard, however, you may opt to receive statements by post, for a charge of &pound;1 per statement.",
				"ManagedLabel": "Managed",
				"ExcecutionOnlyLabel": "Excecution-only and/or advisory",
				"OccupationalExperianceLabel": "Occupational experience - I have good knowledge of OTC, leveraged derivatives through working in the financial sector.",
				"QualificationsLabel": "Qualifications - I have a good knowledge of OTC, leveraged derivatives because of relevent professional qualification and/or my education or relevent training.",
				"ContactInformationLabel": "Contact information",
				"EmploymentStatusLabel": "Employment status",
				"HomeAddressLabel": "Home Address",
				"TimeAtCurrentAddressLabel": "Time at current address",
				"PreviousAddressLabel": "Previous address - if less than 3 years at current address",
				"WhatHaveYouTradedLabel": "To what extent over the past 3 years have you traded the following?",
				"SharesOrBondsLabel": "Shares and/or bonds",
				"ExchangeTradedLabel": "Exchange-traded derivatives (e.g. warrents, futures or options)",
				"SpreadbettingLabel": "OCT derivatives (e.g. CFD's spread betting, forex, binaries)",
				"HowHaveYouTradedLabel": "How have you mostly traded these products?",
				"NoneApplicableLabel": "None-applicable",
				"ExperianceDetailsLabel": "Please provide details of any particular experience or qualifications which would assit your understanding of the services provided by DCM",
				"IncomeBeforeTaxLabel": "Approx. annual income before tax",
				"ValueOfSavingsLabel": "Approx. value of savings and investments (excluding property)",
				"SourceOfFundsLabel": "Source of funds you intend to use with DCM Dealer",
				"StatementsLabel": "Statements",
				"FullNameLabel": "Full name",
				"DateOfBirthLabel": "Date of birth",
				"TitleLabel": "Title",
				"FirstNameLabel": "First Name",
				"LastNameLabel": "Last Name",
				"DayLabel": "Day",
				"MonthLabel": "Month",
				"YearLabel": "Year",
				"PrimaryNumberLabel": "Primary number",
				"MobileNumberLabel": "Mobile number",
				"EmailAddressLabel": "Email address",
				"OccupationLabel": "Occupation",
				"IndustryLabel": "Industry",
				"FirstLineAddressLabel": "First-line address",
				"SecondLineAddressLabel": "Second-line address",
				"TownCityLabel": "Town/City",
				"PostcodeLabel": "Postcode",
				"CountryLabel": "Country",
				"YearsLabel": "Years",
				"MonthsLabel": "Months",
				"OtherReleventExperianceLabel": "Other relevent experience",
				"SpecifyAmountInGBPLabel": "Specify amount in GBP",
				"OtherLabel": "Other",
				"TimeLabel": "Time",
				"CancelledLabel": "Cancelled",
				"CurrencyLabel": "Currency",
				"DisclaimerLabel": "<em>Risk Warning</em> - Spread Betting and CFDs are high risk investments and it is possible to lose more than your initial deposit. Spread Betting and CFDs are not suitable for all investors and you should ensure that you understand the <a href=\"http://www.derwentcapitalmarkets.com/help/#Ans12\" target=\"_blank\">risks involved</a> and, if necessary, obtain independent financial advice to ensure that these products fit your investment objectives. Tax law can be changed or may differ if you pay tax in a jurisdiction other than the UK. DCM Capital Ltd. is a company registered in England and Wales under register number 08064018 . DCM Capital Ltd is Authorised and Regulated by the UK Financial Services Authority Reg. No: 584376.<br /><br /><em>Disclaimer</em> - The information on this site is not directed at residents of the United States and is not intended for distribution to, or use by, any person in any country or jurisdiction where such distribution or use would be contrary to local law or regulation.",
				"ChartModuleHeading": "Chart",
				"UpgradeReviewLabel": "Thank you - please wait a moment while we gather your details in order to generate a <em>pre-populated application form</em>.<br /><br />Your application form is required to be <em>printed</em>, <em>reviewed</em> and <em>signed</em> before being sent to us by one of the methods detailed on the application cover sheet.<br /><br />A copy of your application form will also be emailed to you directly.",
				"GenerateApplicationFormLabel": "Open application form",
				"GeneratingApplicationFormLabel": "Generating application form...",
				"OpenApplicationFormLabel": "Open application form",
				"UpgradeReviewFootLabel": "We'll also email you a copy of your application form, if for any reason you are unable to download.",
				"UpgradeSuccessLabel": "Thank you - you will be notified when your application is processed. Applications typically take 7 days to process.<br /><br />All the best.<br />Team DCM.",
				"ResetPasswordConfirmPasswordLabel": "Confirm new password",
				"ResetPasswordPasswordLabel": "New password",
				"PasswordLabel": "Password",
				//"PasswordHelpLabel": "At DCM Capital we are serious about online security. In order to protect your details it's important you chose a strong password. Please ensure your password contains at least 5 characters, a lower case letter, an upper case letter, a number and a symbol such as !%@*. Once all the boxes above turn green your password choice is sufficiently secure. An example of a secure password would be 'P@55w0rd'",
				"PasswordHelpLabel": "Password must contain at least 5 characters",
				"ResetPasswordForgottenButtonLabel": "Forgotten?",
				"ResetPasswordResetButtonLabel": "Reset password",
				"ResetPasswordResetingLabel": "Resetting password",
				"ResetPasswordResetHeadingLabel": "Reset your password",
				"ResetPasswordConfirmLabel": "Would you like to send a password-reset email to <strong>EMAIL_ADDRESS</strong>?",
				"ResetPasswordRequestSuccessLabel": "If you have not recieved the email within 5 minutes; please check your junk-mail folder.",
				"ResetPasswordRequestSuccessNotifyHeadingLabel": "Password-reset email sent",
				"ResetPasswordRequestHeadingLabel": "Password reset",
				"SuccessLabel": "Success",
				"SignInButtonLabel": "Sign-in",
				"SignInHeadingLabel": "Not registered with DCM Capital?<br /><a href=\"/dealer_platform_open_account\">Create your <em>Free Demo Account</em> here!</a>",
				"SignUpHeadingLabel": "Create your <em>Free Preview Account</em> today and see all the features DCM Dealer has to offer!",
				"SignUpSignupButtonLabel": "Open preview account",
				"SignUpSigningupLabel": "Signing-up",
				"ProfitLossLabel": "Profit/Loss",
				"FundsLabel": "Funds",
				"MarginLabel": "Margin",
				"EquityLabel": "Equity",
				"MarketLabel": "Market",
				"MarketPriceLabel": "M.Price",
				"SizeLabel": "Size",
				"EntryPriceLabel": "E.Price",
				"TypeLabel": "Type",
				"TrailingStopLabel": "T.Stop",
				"GoodTillLabel": "Good till",
				"CreatePortfolioLabel": "Create new portfolio",
				"LowLabel": "Low",
				"HighLabel": "High",
				"UpdatedLabel": "Updated",
				"ChangeLabel": "Change",
				"SentimentLabel": "Sentiment",
				"BuyPriceLabel": "Buy price",
				"SellPriceLabel": "Sell price",
				"AlertMeWhenLabel": "Alert me when...",
				"AlertIsLabel": "is",
				"AlertMessagePlaceholderLabel": "Message",
				"AlertHigherThanLabel": "Higher than",
				"AlertLowerThanLabel": "Lower than",
				"AlertNotifyEmailLabel": "Email",
				"AlertNotifySMSLabel": "SMS",
				"AlertTriggeredLabel": "Alert triggered",
				"SettingsStopsAndLimitsTypeLabel": "Stops/Limits type",
				"SettingsStopsAndLimitsTypePointsLabel": "Points",
				"FinderSearchPlaceholderLabel": "Search by market name or code...",
				"FinderShowAllLabel": "All categories",
				"TicketTransactionComplete": "Transaction Complete",
				"TicketOrderClosed": "Order closed",
				"TicketOrderOpened": "Order opened",
				"TicketOrderModified": "Order modified",
				"TicketServerError": "Unknown error",
				"TicketPositionClosed": "Position closed",
				"TicketPositionModified": "Position modified",
				"NoOrdersLabel": "You currently have no orders - orders are used to automatically open positions when a market meets a given price. To create an order; open a ticket and select the 'order' tab.",
				"NoWatchlistItemsLabel": "You currently have no items in your watchlist - add items by right-clicking on an instrument and selecting 'add to watchlist'.",
				"NoAlertsLabel": "You currently have no alerts - alerts are used to notify you of market activity. To create an alert; right-click on an instrument and select 'add alert'.",
				"NoNotesLabel": "You currently have no notes - notes are used to help you manage your trading activity. To create a note; either right-click on an instrument and select 'add note', or  right-clicking in this module and selecting 'create note'.",
				"NoPositionsLabel": "You currently have no positions.",
				"AddToWatchlistLabel": "Add to watchlist",
				"PinToDashboardLabel": "Pin to dashboard",
				"UnpinFromDashboardLabel": "Unpin from dashboard",
				"OpenInNewWindowLabel": "Open in new window",
				"addNoteLabel": "Add note",
				"SentiballHeadingLabel": "Sentiball&#8482;",
				"SentiballSubHeadingLabel": "Live Sentiment Analysis",
				"UpgradeAccountMessageLabel": "<em>Thank you</em> for opening a preview account with DCM Capital.<br />Before you can begin trading; you are required to upgrade your account.",
				"UpgradeAccountHeadingLabel": "Upgrade to a live account!",
				"UpgradeAccountCFDTradingLabel": "open a CFD trading account with<br />DCM Capital &amp; IG Markets",
				"UpgradeAccountSpreadBettingLabel": "open a spread-betting account with<br />DCM Capital &amp; IG Index",
				"UpgradeAccountSpreadBettingNameLabel": "Spread betting",
				"UpgradeAccountCFDTradingNameLabel": "CFD trading",
				"EditPositionLabel": "Edit position",
				"AddToPortfolioLabel": "Add to portfolio",
				"CancelOrderLabel": "Cancel order",
				"EditOrderLabel": "Edit order",
				"RemoveFromWatchlistLabel": "Remove from watchlist",
				"OpenTicketLabel": "Open ticket",
				"PinTicketToDashboard": "Pin ticket to dashboard",
				"FundingDialogHeading": "Funding",
				"FundingDialogHead": "<em>How do I make a payment into my account?</em><br /><br />Funding line: <em>+44 203 475 4737</em><br />Account number: <em>ACCOUNT_NUMBER</em><br /><br />To fund your account using a <em>debit card</em>, <em>Visa</em> or <em>MasterCard</em>; call our funding line with your card details ready, quoting your account number when prompted.",
				
				"FundingDialogBody": "Alternatively, you may deposit funds into your account via a same-day bank transfer to IG's Lloyds bank account. Most high-street banks provide same-day cash transfer up to a daily limit of &pound;10,000 (fast pay service). For amounts greater than &pound;10,000, the CHAPS service (available through your bank) also provides same-day payment. Please note that BACS payments, by contrast, can take up to four business days to clear. Payments will be allocated to your account shortly after IG receive the funds. As a reference, please attach your name and IG account number to all bank transfers. The segregated sterling bank details for are detailed below.",
				
				//"FundingDialogFoot": "<strong>Please note:</strong> we will charge a 1.5% administration fee for all credit card and non-UK debit card payments. Your card issuer may treat a payment to us as a cash advance. We have no control over this. For legal reasons we are unable to accept cards where the cardholder is a US resident and we are unable to accept MasterCard payments from Singapore residents. To register, or manage additional cards, please contact our Helpdesk on +44 203 475 4737.",
				
				"FundingDialogFoot": "&nbsp;",
				"OpenChartLabel": "Open chart",
				"PinChartToDashboardLabel": "Pin chart to dashboard",
				
				// portfolio delete
				"PortfolioDeleteSuccessLabel": "Portfolio successfully deleted",
				"PortfolioDeleteErrorLabel": "Sorry - your portfolio could not be deleted at this time",
				"PortfolioDeleteConfirmHeading": "Delete portfolio",
				"DeletePortfolioLabel": "Delete portfolio",
				"PortfolioDeleteConfirmMessage": "Are you sure you wish to delete this portfolio?",
				// portfolio create
				"PortfolioCreatedSuccessLabel": "Portfolio successfully created",
				"PortfolioCreatedErrorLabel": "Sorry - portfolio could not be created at this time",
				"PortfolioCreateConfirmHeading": "Create portfolio",
				"PortfolioCreateConfirmMessage": "Portfolio name",
				// item added to portfolio
				"ItemAddedToPortfolioSuccessLabel": "Item successfully added to your portfolio",
				"ItemAddedToPortfolioErrorLabel": "Sorry - item could not be added to your portfolio at this time",
				"PortfolioAddToConfirmHeading": "Add to portfolio",
				"PortfolioAddToConfirmMessage": "Select the portfolio you'd like to place this item in",
				// item removed from portfolio
				"ItemDeletedFromPortfolioSuccessLabel": "Item successfully removed from your portfolio",
				"ItemDeletedFromPortfolioErrorLabel": "Sorry - item could not be removed from your portfolio at this time",
				"PortfolioRemoveFromConfirmHeading": "Remove from portfolio",
				"PortfolioRemoveFromConfirmMessage": "Are you sure you wish to remove this item from your portfolio?",
				
				// watchlist delete
				"WatchlistDeleteSuccessLabel": "Watchlist successfully deleted",
				"WatchlistDeleteErrorLabel": "Sorry - your watchlist could not be deleted at this time",
				"DeleteWatchlistConfirmHeading": "Delete watchlist",
				"DeleteWatchlistLabel": "Delete watchlist",
				"DeleteWatchlistConfirmMessage": "Are you sure you wish to delete your <strong>WATCHLISTNAME</strong> watchlist?",
				// watchlist create
				"WatchlistCreateSuccessLabel": "Watchlist successfully created",
				"WatchlistCreateErrorLabel": "Sorry - watchlist could not be created at this time",
				"CreateWatchlistConfirmHeading": "Create new watchlist",
				"CreateWatchlistLabel": "Create watchlist",
				"CreateWatchlistConfirmMessage": "Watchlist name",
				// watchlist rename
				"WatchlistRenameSuccessLabel": "Watchlist successfully renamed",
				"WatchlistRenameErrorLabel": "Sorry - watchlist could not be renamed at this time",
				"RenameWatchlistHeading": "Rename watchlist",
				"RenameWatchlistMessage": "New watchlist name",
				// add to watchlist
				"AddToWatchlistHeading": "Add to watchlist",
				"AddToWatchlistMessage": "Select the watchlist you'd like to place this item in",
				"ItemAddedToWatchlistSuccessLabel": "Item successfully added to your watchlist",
				"ItemAddedToWatchlistErrorLabel": "Sorry - item could not be added to your watchlist at this time",
				// remove from watchlist
				"RemoveFromWatchlistHeading": "Remove from watchlist",
				"RemoveFromWatchlistMessage": "Are you sure you wish to remove <strong>ITEMNAME</strong> from your <strong>WATCHLISTNAME</strong> watchlist?",
				"ItemRemovedFromWatchlistSuccessLabel": "Item successfully removed from your watchlist",
				"ItemRemovedFromWatchlistErrorLabel": "Sorry - item could not be removed from your watchlist at this time",
				
				// alert create
				"AddAlertLabel": "Add alert",
				"AlertCreateSuccessLabel": "Alert successfully created",
				"AlertCreateErrorLabel": "Sorry - your alert could not be created at this time",
				// alert delete
				"DeleteAlertLabel": "Delete alert",
				"AlertDeleteSuccessLabel": "Alert successfully deleted",
				"AlertDeleteErrorLabel": "Sorry - your alert could not be deleted at this time",
				"AlertDeleteConfirmHeading": "Delete alert",
				"AlertDeleteConfirmMessage": "Are you sure you wish to delete this alert?",
				// alert edit
				"EditAlertLabel": "Edit alert",
				"AlertEditSuccessLabel": "Alert successfully edited",
				"AlertEditErrorLabel": "Sorry - your alert could not be edited at this time",
				
				// note edit
				"EditNoteLabel": "Edit note",
				"NoteEditSuccessLabel": "Note successfully edited",
				"NoteEditErrorLabel": "Sorry - your note could not be edited at this time",
				// note delete
				"DeleteNoteLabel": "Delete note",
				"NoteDeleteSuccessLabel": "Note successfully deleted",
				"NoteDeleteErrorLabel": "Sorry - your note could not be deleted at this time",
				"NoteDeleteConfirmHeading": "Delete note",
				"NoteDeleteConfirmMessage": "Are you sure you wish to delete this note?",
				// note create
				"CreateNoteLabel": "Create note",
				"NoteCreateSuccessLabel": "Note successfully created",
				"NoteCreateErrorLabel": "Sorry - your note could not be created at this time",
				
				// news
				"NewsOpenError": "Sorry - news article could not be opened at this time",
				
				// sign-up
				"SignUpServiceError": "Sorry - your details could not be submitted at this time",
				
				// login
				"LoginServiceError": "Sorry - you could not be logged in at this time",
				
				// request password
				"PasswordRequestServiceError": "Sorry - your password request could not be sent in at this time",
				
				"PositionOpenSuccess": "Transaction complete",
				"PositionCloseSuccessLabel": "Position successfully closed",
				"PositionCloseErrorLabel": "Sorry - your position could not be closed at this time",
				"OrderCloseSuccessLabel": "Order successfully closed",
				"OrderCloseErrorLabel": "Sorry - your order could not be closed at this time",
				"LevelLabel": "Level",
				"PinnedItemSuccessLabel": "Ticket pinned to bottom of dashboard",
				"PeriodLabel": "Period",
				"SentimentChangeLabel": "Change",
				"LogoutConfirmHeading": "Logout",
				"LogoutConfirmMessage": "Are you sure you wish to log out?",
				"TweetsPanelHeading": "Live Tweets",
				"PriceLabel": "Price",
				"PlaceTradeLabel": "Place trade",
				"PlaceOrderLabel": "Place order",
				"ModifyPositionLabel": "Modify position",
				"ModifyOrderLabel": "Modify order",
				"CloseOrderLabel": "Close order",
				"ClosePositionLabel": "Close position",
				"TutorialLabel": "Tutorial",
				"EducationLabel": "Education",
				"FundingLabel": "Funding",
				"AccountIDLabel": "Account ID",
				"PositionClosedNotificationHeading": "Position closed",
				"PositionClosedNotificationBody": "Summary of details at time of close",
				"ReferenceNumberLabel": "Reference number",
				"DirectionLabel": "Direction",
				"ConsiderationGraphHeadingLabel": "Portfolio consideration",
				"SorryHeadingLabel": "Sorry!",
				"SigningInLabel": "Signing-in",
				"QuantityLabel": "Quantity",
				"MinimumAbbrLabel": "min.",
				"UpgradeAccountDisclaimerLinksLabel": "By opening an account with DCM Capital Ltd you agree to the content of the following documents: <a href=\"http://www.dcmcap.com/forms/dcm-client-agreement/DCMCAV1.pdf\" target=\"_blank\">DCM Client Agreement</a>, <a href=\"http://a.c-dn.net/c/content/dam/publicsites/1347047355881/igm/files/account/120900_IGM_UK_RDN.pdf\" target=\"_blank\">IG Risk Disclosure Notice</a>, <a href=\"http://a.c-dn.net/c/content/dam/publicsites/1347047337620/igm/files/account/CustomerAgreement_igm_en_GB.pdf\" target=\"_blank\">IG Customer Agreement</a>, <a href=\"http://a.c-dn.net/c/content/dam/publicsites/1347047364512/igm/files/account/uk-igm-order-execution.pdf\" target=\"_blank\">IG Summary Order Execution Policy</a>, <a href=\"http://a.c-dn.net/c/content/dam/publicsites/1347047363815/igm/files/account/uk-igm-conflicts.pdf\" target=\"_blank\">IG Summary Conflicts Policy</a>",
				"DateLabel": "Date",
				"TimeLabel": "Time",
				"DateSelectHeading": "Select date and time",
				"RemoveFromPortfolioLabel": "Remove from portfolio",
				
				"LoginEmailNotRecognised": "The email address provided is not recognised - please amend and try again.",
				"SettingsStopsAndLimitsTypeDiscliamerLabel": "* Please note the increments of the stops and limits may vary depending on the instrument you are trading, please take time to observe the minimum increment values before placing your trade",
				"UpgradeAccountPersonalTabLabel": "Personal",
				"UpgradeAccountAddressTabLabel": "Address",
				"UpgradeAccountExperianceTabLabel": "Experience",
				"UpgradeAccountFinancialTabLabel": "Financial",
				"UpgradeAccountReviewTabLabel": "Complete",
				"TicketTradeTabLabel": "Trade",
				"TicketOrderTabLabel": "Order",
				"TicketWizardTabLabel": "Wizard",
				"SwitchAccountCFDTradingLabel": "CFD Trading",
				"SwitchAccountSpreadBettingLabel": "Spread Betting",
				"SwitchAccountConfirmHeading": "Switch account",
				"SwitchAccountConfirmMessage": "Are you sure you wish to switch to your ACCOUNT_NAME account",
				"SwitchAccountRejectNotifyHeading": "Switch account",
				"SwitchAccountRejectNotifyMessage": "In order to access a ACCOUNT_NAME account; you are required to register a second time.",
				// descriptive tooltips 
				"ConsiderationTooltipLabel": "Consideration - average profit/loss",
				"QuantityTooltipLabel": "Quanitity [required] - profit/loss per point movement is calculated by multiplying price by quantity",
				"PriceTooltipLabel": "Price - profit/loss per point movement is calculated by multiplying price by quantity",
				"StopTooltipLabel": "Maximum loss value",
				"LimitTooltipLabel": "Maximum profit value",
				"ForceOpenTooltipLabel": "",
				"GoodTIllTooltipLabel": "Good till - the point at which your order is to expire",
				"GoodTillCancelledTooltipLabel": "Good till cancelled - order remains open until manually closed or filled, whichever comes first",
				"GoodTillTimeTooltipLabel": "Good till time - order is automacially closed at a given time and date",
				"TypeTooltipLabel": "",
				"ProfitLossTooltipLabel": "Profit/Loss",
				"EntryPriceTooltipLabel": "Entry price",
				"MarketPriceTooltipLabel": "Market price",
				"SizeTooltipLabel": "Size/Direction",
				"SellTooltipLabel": "Sell price",
				"BuyTooltipLabel": "Buy price",
				"PiceChangeTooltipLabel": "Price daily-change",
				"PiceLowTooltipLabel": "Price low",
				"PiceHighTooltipLabel": "Price high",
				"UpdateTimeTooltipLabel": "Update time",
				"MarketTooltipLabel": "Market name",
				"SentimentTooltipLabel": "Live Sentiment",
				"SentimentChangeTooltipLabel": "Sentiment daily-change",
				"TicketTradeTooltipLabel": "Trade - enter into market immediatly",
				"TicketOrderTooltipLabel": "Order - enter into market when a set of given criteria are met",
				"FinderItemTooltipLabel": "Double-click to open ticket",
				
				"TermsAndConditionsLabel": "Terms &amp; Conditions",
				"PrivacyPolicyLabel": "Privacy policy",
				"ContactLabel": "Contact",
				"IncrementLabel": "Increment",
				"DecrementLabel": "Decrement",
				"OpenNewsArticle": "Open article",
				"AlertMarkAsRead": "Mark as read",
				"DockTicketLabel": "Dock ticket",
				"UpgradeAccountLabel": "Upgrade account",
				"NextLabel": "Next",
				"PreviousLabel": "Previous",
				"UpgradeAccountFootLabel": "<strong data-color=\"orange\">PREVIEW ACCOUNT</strong> - IN ORDER TO BEGIN TRADING; YOU ARE REQUIRED TO UPGRADE TO A LIVE ACCOUNT.",
				"UpgradeAccountFootButtonLabel": "Upgrade to a live account",
				"ApplyOnlineLabel": "Apply online"
				
			});

		}));
		Resources.prototype.setResourceGroup = function(name, obj) {
			
			_this[name] = obj;

		};
		Resources.prototype.setCulture = function(value) {
			
			_this.culture = value;

		};
		Resources.prototype.getResource = function(label, replacements) {
		
			var _return = _this[_this.culture][label];
			
			if(!_return) {
				_return = ("MISSING RESOURCE[" + label + "]");
			};
			
			if(replacements) {
			
				var loop = replacements.length;
				
				while(loop--) {
				
					_return = _return.replace(replacements[loop].placeholder, replacements[loop].label);
					
				};
				
			};
			
			return _return;
		
		};

	}
	catch(e) {
		
		DCM.warn("Resources", e);
		
	};

})();